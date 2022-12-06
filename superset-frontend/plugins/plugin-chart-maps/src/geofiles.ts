import puglia from './geofiles/puglia.geojson';

const geofiles = {
  puglia,
};

// Prepare list of options for SelectControl
export const geofilesOptions = Object.keys(geofiles).map(x => [
  x,
  x[0].toUpperCase() + x.slice(1),
]);

export default geofiles;
