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
  const parent = inject(
    '$_ais_getParentIndex',
    () => instantSearchInstance.mainIndex
  )();

  const state = ref(null);
  let widget;

  const render = (newState, isFirstRender) => {
    if (isFirstRender) return;

    // Avoid updating the state on first render
    // otherwise there will be a flash of placeholder data
    state.value = newState;
  };

  const updateWidget = () => {
    removeWidget(widget, parent);
    state.value = null;
    widget = addWidget(connector, parent, widgetParams.value, render);
  };

  onMounted(() => {
    widget = addWidget(
      connector,
      parent,
      isRef(widgetParams) ? widgetParams.value : widgetParams,
      render
    );
    forceRender(widget, parent, instantSearchInstance);
  });

  onUnmounted(() => {
    removeWidget(widget, parent);
    widget = null;
  });

  if (isRef(widgetParams)) {
    watch(widgetParams, updateWidget);
  }

  return state;
}
