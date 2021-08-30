import { inject, ref, watch, onMounted, onUnmounted } from '../util/vue-compat';

export function useConnector(connector, props, initialState) {
  const instantSearchInstance = inject('$_ais_instantSearchInstance');
  const getParentIndex = inject('$_ais_getParentIndex');
  const indexWidget = getParentIndex && getParentIndex();
  const parent = indexWidget || instantSearchInstance;
  const state = ref(initialState);
  let widget = ref(null);

  const addWidget = () => {
    const createWidget = connector(newState => {
      state.value = newState;
    });
    widget.value = createWidget(props);
    parent.addWidgets([widget.value]);
  };

  const removeWidget = () => {
    if (widget.value) {
      parent.removeWidgets([widget.value]);
      widget.value = null;
    }
  };

  const updateWidget = () => {
    removeWidget();
    addWidget();
  };

  onMounted(addWidget);
  onUnmounted(removeWidget);
  watch(() => connector, updateWidget);
  watch(() => props, updateWidget);

  return state;
}

