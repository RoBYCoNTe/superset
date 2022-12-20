/* eslint-disable no-new-func */
/* eslint-disable no-console */

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import {
  PluginChartHighchartsProps,
  PluginChartHighchartsStylesProps,
} from './types';
import { loadAllScripts } from './appendScript';

const SCRIPTS_TO_LOAD = [
  'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.3/highcharts.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.3/highcharts-more.js',
];

const Styles = styled.div<PluginChartHighchartsStylesProps>`
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  overflow-x: scroll;
  overflow-y: hidden;
  background-color: 'transparent';
`;

export default function PluginHightcharts(props: PluginChartHighchartsProps) {
  console.log('props:', props);
  const { height, width, config, init } = props;
  const [isReady, setIsReady] = React.useState(false);
  const rootElem = createRef<HTMLDivElement>();

  React.useEffect(() => {
    loadAllScripts(SCRIPTS_TO_LOAD).then(() => setIsReady(true));
  }, []);

  React.useEffect(() => {
    if (!rootElem.current) {
      return;
    }
    if (isReady) {
      const Highcharts = (window as any).Highcharts || {};
      if (typeof Highcharts === 'undefined') {
        console.error('Highcharts is not loaded');
        return;
      }
      const chartConfig = new Function(config).call({
        ...props,
        element: rootElem?.current,
      });
      if (typeof init === 'string' && init.length > 0) {
        new Function(init).call({
          ...props,
          element: rootElem?.current,
        });
      }
      Highcharts.chart(rootElem.current, chartConfig);
    }
  }, [isReady, config, init, rootElem, props]);

  return <Styles ref={rootElem} height={height} width={width} />;
}
