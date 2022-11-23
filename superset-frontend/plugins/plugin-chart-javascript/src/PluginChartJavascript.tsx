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
  PluginChartJavascriptProps,
  PluginChartJavascriptStylesProps,
} from './types';
import { loadAllScripts } from './appendScript';

const Styles = styled.div<PluginChartJavascriptStylesProps>`
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  overflow-x: scroll;
  overflow-y: hidden;
  background-color: 'transparent';
`;

export default function PluginHightcharts(props: PluginChartJavascriptProps) {
  const { height, width, libraries, javascript } = props;
  const [isReady, setIsReady] = React.useState(false);
  const rootElem = createRef<HTMLDivElement>();

  React.useEffect(() => {
    const scripts = JSON.parse(libraries || '[]');
    console.info('scripts', scripts);
    loadAllScripts(scripts).then(() => setIsReady(true));
  }, [libraries]);

  React.useEffect(() => {
    if (!rootElem.current) {
      return;
    }
    if (isReady) {
      const fn = new Function(javascript);
      fn.call({ ...props, element: rootElem?.current });
    }
  }, [isReady, javascript, rootElem, props]);

  return <Styles ref={rootElem} height={height} width={width} />;
}
