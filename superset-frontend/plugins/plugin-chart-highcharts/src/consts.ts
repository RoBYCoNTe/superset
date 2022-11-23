import { debounce } from 'lodash';
import { SLOW_DEBOUNCE } from '@superset-ui/core';

export const debounceFunc = debounce(
  (func: (val: string) => void, source: string) => func(source),
  SLOW_DEBOUNCE,
);
