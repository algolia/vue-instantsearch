import {
  inject,
  ref,
  isRef,
  watch,
  onMounted,
  onUnmounted,
} from '../util/vue-compat';
import { addWidget, removeWidget, forceRender } from '../util/widget';

export function useConnector(connector, props) {
  const instantSearchInstance = inject('$_ais_instantSearchInstance');
  const parent = inject(
    '$_ais_getParentIndex',
    () => instantSearchInstance.mainIndex
  )();

  const state = ref(null);
  let widget;

  const render = (newState, isFirstRender) => {
    // Avoid updating the state on first render
    // otherwise there will be a flash of placeholder data
    if (isFirstRender) return;

    const copy = Object.assign({}, newState);
    delete copy.widgetParams;
    state.value = copy;
  };

  const updateWidget = () => {
    removeWidget(widget, parent);
    state.value = null;
    widget = addWidget(connector, parent, props.value, render);
  };

  onMounted(() => {
    widget = addWidget(
      connector,
      parent,
      isRef(props) ? props.value : props,
      render
    );
    forceRender(widget, parent, instantSearchInstance);
  });

  onUnmounted(() => {
    removeWidget(widget, parent);
    widget = null;
  });

  if (isRef(props)) {
    watch(props, updateWidget);
  }

  return state;
}
