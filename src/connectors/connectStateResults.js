const connectStateResults = (renderFn, unmountFn) => (widgetParams = {}) => ({
  init({ instantSearchInstance }) {
    renderFn(
      {
        state: undefined,
        results: undefined,
        instantSearchInstance,
        widgetParams,
      },
      true
    );
  },

  render({ results, instantSearchInstance, state }) {
    const resultsCopy = Object.keys(results).reduce((acc, key) => {
      if (key !== '_state') {
        // eslint-disable-next-line no-param-reassign
        acc[key] = results[key];
      }
      return acc;
    }, {});

    const stateCopy = Object.keys(state).reduce((acc, key) => {
      // eslint-disable-next-line no-param-reassign
      acc[key] = state[key];
      return acc;
    }, {});

    renderFn(
      {
        results: resultsCopy,
        state: stateCopy,
        instantSearchInstance,
        widgetParams,
      },
      false
    );
  },

  dispose() {
    unmountFn();
  },
});

export default connectStateResults;
