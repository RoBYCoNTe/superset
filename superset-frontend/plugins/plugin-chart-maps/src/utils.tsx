/* eslint-disable theme-colors/no-literal-colors */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Fill from 'ol/style/Fill';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export type createLayerOptions = {
  url: string;
  color?: string;
};

export const createLayer = ({ url, color }: createLayerOptions) => {
  const layer = new VectorLayer({
    opacity: 0.8,
    style(feature) {
      return new Style({
        fill: new Fill({
          color: '#d3d3d3',
        }),
        stroke: new Stroke({
          color: 'black',
          width: 2,
          lineCap: 'round',
        }),
      });
    },
    source: new VectorSource({
      url,
      format: new GeoJSON({
        dataProjection: 'EPSG:4326',
      }),
    }),
  });
  return layer;
};

export const resolveValue = (name: string, explore: any) => {
  // Try to obtain value from explore?.form_data or explore?.slice?.form_data
  const value = explore?.form_data?.[name] || explore?.slice?.form_data?.[name];
  // Generate choices from explore?.queryResponses?.[0] or
  // create a single choice from value.
  const choices =
    explore?.queryResponses?.[0]?.colnames?.map((colname: any) => [
      colname,
      colname,
    ]) || (value ? [[value, value]] : []);
  return {
    choices,
    value,
  };
};
