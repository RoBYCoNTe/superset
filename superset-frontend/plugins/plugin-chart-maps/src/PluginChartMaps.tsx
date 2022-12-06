/* eslint-disable no-console */
import React, { createRef } from 'react';
import { styled } from '@superset-ui/core';
import { PluginChartMapsProps, PluginChartMapsStylesProps } from './types';

const Styles = styled.div<PluginChartMapsStylesProps>`
  background-color: ${({ theme }: { theme: any }) =>
    theme.colors.secondary.light2};
  border-radius: ${({ theme }: { theme: any }) => theme.gridUnit * 2}px;
  overflow: hidden;
  height: ${({ height }: { height: any }) => height}px;
  width: ${({ width }: { width: any }) => width}px;
`;

export default function PluginChartMaps(props: PluginChartMapsProps) {
  const { height, width } = props;
  const rootElem = createRef<HTMLDivElement>();

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Styles>
  );
}
