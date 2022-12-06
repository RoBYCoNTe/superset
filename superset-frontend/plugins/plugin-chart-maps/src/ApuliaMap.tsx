/* eslint-disable theme-colors/no-literal-colors */
import 'ol/ol.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { createLayer } from './utils';

export type ApuliaMapProps = {
  width: number;
  height: number;
  baseUrl: string;
};

const ApuliaMap = ({ width, height, baseUrl }: ApuliaMapProps) => {
  const [map, setMap] = useState<any>();
  const mapElement = useRef<HTMLDivElement>(null);

  const getUrl = useCallback(
    (name: string): string => `${baseUrl}/${name}.geojson`,
    [baseUrl],
  );
  useEffect(() => {
    if (mapElement.current === null) {
      return;
    }
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        createLayer({
          url: getUrl('municipalities-puglia'),
          color: 'red',
        }),
      ],

      view: new View({
        center: [17.3611, 40.5044],
        zoom: 8,
      }),
    });

    setMap(map);
  }, [getUrl]);

  useEffect(() => {
    map?.updateSize();
  }, [map, width, height]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      ref={mapElement}
      className="map-container"
    />
  );
};

export default ApuliaMap;
