import { QueryFormData, TimeseriesDataRecord } from '@superset-ui/core';

export interface PluginChartMapsStylesProps {
  height: number;
  width: number;
}

interface PluginChartMapsCustomizeProps {
  matchColumn?: string;
  valueColumn?: string;
}

export type PluginChartMapsQueryFormData = QueryFormData &
  PluginChartMapsStylesProps &
  PluginChartMapsCustomizeProps;

export type PluginChartMapsProps = PluginChartMapsStylesProps &
  PluginChartMapsCustomizeProps & {
    data: TimeseriesDataRecord[];
  };
