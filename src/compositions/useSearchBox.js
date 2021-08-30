import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { useConnector } from './useConnector';

const noop = () => {};

export function useSearchBox(props) {
  return useConnector(connectSearchBox, props, {
    query: '',
    refine: noop,
    clear: noop,
    isSearchStalled: false,
  });
}
