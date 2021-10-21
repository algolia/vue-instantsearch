import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { useConnector } from './useConnector';
import { computed } from '../util/vue-compat';

export function useRefinementList(props) {
  const state = useConnector(connectRefinementList, props);

  return computed(() =>
    Object.assign({}, state.value, {
      items: state.value.items.map(item =>
        Object.assign({}, item, {
          _highlightResult: {
            label: {
              value: item.highlighted,
            },
          },
        })
      ),
    })
  );
}
