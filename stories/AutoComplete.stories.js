import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import VueAutosuggest from 'vue-autosuggest';
Vue.use(VueAutosuggest);

storiesOf('AutoComplete', module)
  .addDecorator(previewWrapper())
  .add('No slot given', () => ({
    template: `<ais-auto-complete></ais-auto-complete>`,
  }))
  .add('using vue-autosuggest', () => ({
    template: `
      <ais-auto-complete>
        <template slot-scope="{currentRefinement, indices, refine}">
          <p>I'd like to use the indices in the suggestions</p>
          <p>
            Also seems like it's impossible to fully control the input
            (try typing in the other input on the page).
          </p>
          <details>
            <summary><code>indices</code></summary>
            <pre>{{indices}}</pre>
          </details>
          <vue-autosuggest
            :suggestions="indices[0].hits.map(item => item.name)"
            :on-selected="selectHandler"
            :input-props="{
              value: currentRefinement,
              onInputChange: refine,
            }"
          >
          </vue-autosuggest>
        </template>
      </ais-auto-complete>
    `,
    methods: {
      selectHandler(...args) {
        console.log('selected', ...args);
      },
    },
  }));
