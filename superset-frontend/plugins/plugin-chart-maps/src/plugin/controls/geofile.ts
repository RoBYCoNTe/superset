import { t } from '@superset-ui/core';
import { geofilesOptions } from '../../geofiles';

const geojson = {
  name: 'geofile',
  config: {
    type: 'SelectControl',
    label: t('Geofile'),
    description: t('Geofile to plot on map.'),
    default: null,
    choices: geofilesOptions,
  },
};

export default geojson;
