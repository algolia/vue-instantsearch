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
            <vue-autosuggest
              :suggestions="indicesToSuggestions(indices)"
              :on-selected="selectHandler"
              :input-props="{
                style: 'width: 100%',
                onInputChange: refine,
              }"
            >
            <template slot-scope="{suggestion}">
              <img :src="suggestion.item.image" style="width: 50px;"/>
              <span>
                <ais-highlight
                  :hit="suggestion.item"
                  attribute="name"
                /> - <strong>$ {{ suggestion.item.price }}</strong>
              </span>
            </template>
            </vue-autosuggest>
          </template>
        </ais-autocomplete>
        <details v-if="selected">
          <summary><code>selected item</code></summary>
          <pre>{{selected.item}}</pre>
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
      indicesToSuggestions(indices) {
        return indices.map(({ hits }) => ({ data: hits }));
      },
    },
  }));
