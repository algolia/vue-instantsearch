import { connectRefinementList } from 'instantsearch.js/es/connectors';
import { useConnector } from './useConnector';
import { noop } from '../util/noop';
import { computed } from '../util/vue-compat';

export function useRefinementList(props) {
  const state = useConnector(connectRefinementList, props, {
    items: [],
    refine: noop,
    canRefine: false,
    canToggleShowMore: false,
    createURL: () => '#',
    hasExhaustiveItems: false,
    isFromSearch: false,
    isShowingMore: false,
    searchForItems: noop,
    sendEvent: noop,
    toggleShowMore: noop,
  });

  return computed(() => ({
    ...state.value,
    items: state.value.items.map(item => ({
      ...item,
      _highlightResult: {
        label: {
          value: item.highlighted,
        },
      },
    })),
  }));
}
