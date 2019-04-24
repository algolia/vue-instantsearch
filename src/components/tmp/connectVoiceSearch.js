import noop from 'lodash/noop';
import {
  checkRendering,
  createDocumentationMessageGenerator,
} from 'instantsearch.js/es/lib/utils';

import voiceSearchHelper from './voiceSearchHelper';

const withUsage = createDocumentationMessageGenerator({
  name: 'voice-search',
  connector: true,
});

const connectVoiceSearch = (renderFn, unmountFn = noop) => {
  checkRendering(renderFn, withUsage());

  return widgetParams => {
    const render = ({
      isFirstRendering,
      instantSearchInstance,
      voiceSearchHelper: {
        isBrowserSupported,
        isListening,
        toggleListening,
        getState,
      },
    }) => {
      renderFn(
        {
          isBrowserSupported: isBrowserSupported(),
          isListening: isListening(),
          toggleListening,
          voiceListeningState: getState(),
          widgetParams,
          instantSearchInstance,
        },
        isFirstRendering
      );
    };

    const { searchAsYouSpeak } = widgetParams;

    return {
      init({ helper, instantSearchInstance }) {
        this._refine = (() => {
          let previousQuery;
          const setQueryAndSearch = query => {
            if (query !== helper.state.query) {
              previousQuery = helper.state.query;
              helper.setQuery(query);
            }
            if (
              typeof previousQuery !== 'undefined' &&
              previousQuery !== query
            ) {
              helper.search();
            }
          };
          return setQueryAndSearch;
        })();
        this._voiceSearchHelper = voiceSearchHelper({
          searchAsYouSpeak,
          onQueryChange: query => this._refine(query),
          onStateChange: () => {
            render({
              isFirstRendering: false,
              instantSearchInstance,
              voiceSearchHelper: this._voiceSearchHelper,
            });
          },
        });
        render({
          isFirstRendering: true,
          instantSearchInstance,
          voiceSearchHelper: this._voiceSearchHelper,
        });
      },
      render({ instantSearchInstance }) {
        render({
          isFirstRendering: false,
          instantSearchInstance,
          voiceSearchHelper: this._voiceSearchHelper,
        });
      },
      dispose({ state }) {
        unmountFn();
        return state.setQuery('');
      },
      getWidgetState(uiState, { searchParameters }) {
        const query = searchParameters.query;

        if (query === '' || (uiState && uiState.query === query)) {
          return uiState;
        }

        return Object.assign({}, uiState, { query });
      },
      getWidgetSearchParameters(searchParameters, { uiState }) {
        return searchParameters.setQuery(uiState.query || '');
      },
    };
  };
};

export default connectVoiceSearch;
