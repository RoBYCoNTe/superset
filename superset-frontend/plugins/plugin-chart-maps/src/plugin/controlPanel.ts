/* eslint-disable no-console */
import { t } from '@superset-ui/core';
import { ControlPanelConfig, sections } from '@superset-ui/chart-controls';

import geojson from './controls/geofile';

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [geojson],
        ['entity'],
        ['metric'],
        ['adhoc_filters'],
        ['linear_color_scheme'],
      ],
    },
  ],
  controlOverrides: {
    entity: {
      label: t('Feature matching column'),
      description: t('Column that matches the geojson feature'),
    },
  },
};

export default config;
