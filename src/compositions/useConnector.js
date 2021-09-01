import {
  inject,
  ref,
  isRef,
  watch,
  onMounted,
  onUnmounted,
} from '../util/vue-compat';

export function useConnector(connector, widgetParams, initialState) {
  const instantSearchInstance = inject('$_ais_instantSearchInstance');
  const getParentIndex = inject('$_ais_getParentIndex', undefined);
  const indexWidget = getParentIndex && getParentIndex();
  const parent = indexWidget || instantSearchInstance;
  const state = ref(initialState);
  const widget = ref(null);

  const addWidget = () => {
    const createWidget = connector(newState => {
      state.value = newState;
    });
    widget.value = createWidget(
      isRef(widgetParams) ? widgetParams.value : widgetParams
    );
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

  if (isRef(widgetParams)) {
    watch(widgetParams, updateWidget);
  }

  return state;
}
