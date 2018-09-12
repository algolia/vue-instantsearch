import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import VueAutosuggest from 'vue-autosuggest';
Vue.use(VueAutosuggest);

storiesOf('Autocomplete', module)
  .addDecorator(previewWrapper())
  .add('No slot given', () => ({
    template: `<ais-autocomplete></ais-autocomplete>`,
  }))
  .add('using vue-autosuggest', () => ({
    template: `
      <div>
        <ais-autocomplete>
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
              :suggestions="[{ data: indices[0].hits }]"
              :on-selected="selectHandler"
              :input-props="{
                style:'width: 100%;',
                value: currentRefinement,
                onInputChange: refine,
              }"
            >
            <template slot-scope="{suggestion}">
              <img :src="suggestion.item.image" style="width: 50px;"/><span class="my-suggestion-item">{{suggestion.item.name}} - <strong>$ {{ suggestion.item.price }}</strong></span>
            </template>
            </vue-autosuggest>
          </template>
        </ais-autocomplete>
        <details v-if="selected">
          <summary><code>selected item</code></summary>
          <pre>
            <code>{{selected.item}}</code>
          </pre>
        </details>
      </div>
    `,
    data() {
      return { selected: undefined };
    },
    methods: {
      selectHandler(selected) {
        this.selected = selected;
      },
    },
  }));
