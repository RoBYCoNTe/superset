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
import {
  ControlSetItem,
  CustomControlConfig,
  sharedControls,
} from '@superset-ui/chart-controls';
import { t, validateNonEmpty } from '@superset-ui/core';
import React from 'react';
import { CodeEditor } from '../../components/CodeEditor';
import { ControlHeader } from '../../components/ControlHeader';
import { debounceFunc } from '../../consts';

interface CodeEditorControlProps {
  value: string;
  height: number;
}

const CodeEditorControl = (
  props: CustomControlConfig<CodeEditorControlProps>,
) => {
  const val = String(
    props?.value ? props?.value : props?.default ? props?.default : '',
  );

  return (
    <div>
      <ControlHeader>{props.label}</ControlHeader>
      <CodeEditor
        theme="light"
        value={val}
        height={props.height}
        onChange={source => {
          debounceFunc(props.onChange, source || '');
        }}
      />
    </div>
  );
};

export const javascript: ControlSetItem = {
  name: 'javascript',
  config: {
    ...sharedControls.entity,
    type: CodeEditorControl,
    label: t('Js Code'),
    description: t('Javascript code to be executed'),
    default: `const { data, element } = this;
// Do whatever you want with the data and element.
// The element is the DOM element that the chart will be rendered to.
// The data is the data that will be passed to the chart.
    `,
    isInt: false,
    renderTrigger: true,
    height: 600,
    validators: [validateNonEmpty],
    mapStateToProps: ({ controls }) => ({
      value: controls?.handlebars_template?.value,
    }),
  },
};

export const libraries: ControlSetItem = {
  name: 'libraries',
  config: {
    ...sharedControls.entity,
    type: CodeEditorControl,
    label: t('Libraries'),
    description: t('Array of libraries to load before execute javascript.'),
    default: `return [];`,
    isInt: false,
    height: 200,
    renderTrigger: true,

    validators: [validateNonEmpty],
    mapStateToProps: ({ controls }) => ({
      value: controls?.handlebars_template?.value,
    }),
  },
};
