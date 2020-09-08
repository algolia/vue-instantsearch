import { createWidgetMixin } from '../mixins/widget';
import { createSuitMixin } from '../mixins/suit';
import { connectConfigure } from 'instantsearch.js/es/connectors';
import * as Vue from 'vue';

export default {
  inheritAttrs: false,
  name: 'AisConfigure',
  mixins: [
    createSuitMixin({ name: 'Configure' }),
    createWidgetMixin({ connector: connectConfigure }),
  ],
  computed: {
    widgetParams() {
      return {
        searchParameters: this.$attrs,
      };
    },
  },
  render(createElement) {
    const slot =
      'default' in this.$slots
        ? this.$slots.default
        : this.$scopedSlots.default;

    if (!this.state || !slot) {
      return null;
    }

    return (Vue.h || createElement)(
      'div',
      {
        class: this.suit(),
      },
      [
        slot({
          refine: this.state.refine,
          searchParameters: this.state.widgetParams.searchParameters,
        }),
      ]
    );
  },
};
