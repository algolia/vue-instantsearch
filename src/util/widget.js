export const addWidget = (connector, parent, widgetParams, render) => {
  const factory = connector(render);
  const widget = factory(widgetParams);
  parent.addWidgets([widget]);

  return widget;
};

export const forceRender = (widget, parent, instantSearchInstance) => {
  if (
    instantSearchInstance.__initialSearchResults &&
    !instantSearchInstance.started
  ) {
    if (typeof instantSearchInstance.__forceRender !== 'function') {
      throw new Error(
        'You are using server side rendering with <ais-instant-search> instead of <ais-instant-search-ssr>.'
      );
    }
    instantSearchInstance.__forceRender(widget, parent);
  }
};

export const removeWidget = (widget, parent) => {
  if (widget) {
    parent.removeWidgets([widget]);
  }
};
