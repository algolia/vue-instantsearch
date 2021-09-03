import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { noop } from '../util/noop';
import { useConnector } from './useConnector';

export function useSearchBox(props) {
  return useConnector(connectSearchBox, props, {
    query: '',
    refine: noop,
    clear: noop,
    isSearchStalled: false,
  });
}
