<template>
  <div v-if="state">
    <slot :items="state.items">
      <div v-for="(item, key) in state.items" :key="key">
        <pre>{{item}}</pre>
      </div>
    </slot>
  </div>
</template>

<script>
import { createSuitMixin } from '../mixins/suit';
import { createWidgetMixin } from '../mixins/widget';
import { connectQueryRules } from '../../../instantsearch.js/es/connectors';

export default {
  name: 'AisQueryRuleCustomData',
  mixins: [
    createSuitMixin({ name: 'QueryRuleCustomData' }),
    createWidgetMixin({
      connector: connectQueryRules,
    }),
  ],
  props: {
    transformItems: {
      type: Function,
      required: false,
      default: customData => customData,
    },
  },
  computed: {
    widgetParams() {
      return {
        transformItems: this.transformItems,
      };
    },
  },
  render() {
    return null;
  },
};
</script>
