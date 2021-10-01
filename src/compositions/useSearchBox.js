import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { useConnector } from './useConnector';

export function useSearchBox(props) {
  return useConnector(connectSearchBox, props);
}
