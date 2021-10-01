import { connectConfigure } from 'instantsearch.js/es/connectors';
import { computed } from '../util/vue-compat';
import { useConnector } from './useConnector';

export function useConfigure(props) {
  const widgetParams = computed(() => ({ searchParameters: props }));
  return useConnector(connectConfigure, widgetParams);
}
