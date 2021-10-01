import {
  inject,
  ref,
  isRef,
  watch,
  onMounted,
  onUnmounted,
} from '../util/vue-compat';
import { addWidget, removeWidget, forceRender } from '../util/widget';

export function useConnector(connector, widgetParams) {
  const instantSearchInstance = inject('$_ais_instantSearchInstance');
  const getParentIndex = inject('$_ais_getParentIndex', undefined);
  const indexWidget = getParentIndex && getParentIndex();
  const parent = indexWidget || instantSearchInstance;
  const state = ref(null);
  const widget = ref(null);

  const render = (newState, isFirstRender) => {
    if (isFirstRender) return;

    // Avoid updating the state on first render
    // otherwise there will be a flash of placeholder data
    state.value = newState;
  };

  const updateWidget = () => {
    removeWidget(widget.value, parent);
    state.value = null;
    widget.value = addWidget(connector, parent, widgetParams.value, render);
  };

  onMounted(() => {
    widget.value = addWidget(
      connector,
      parent,
      isRef(widgetParams) ? widgetParams.value : widgetParams,
      render
    );
    forceRender(widget.value, parent, instantSearchInstance);
  });
  onUnmounted(() => {
    removeWidget(widget.value, parent);
    widget.value = null;
  });

  if (isRef(widgetParams)) {
    watch(widgetParams, updateWidget);
  }

  return state;
}
