<template>
  <div
    v-if="state"
    :class="suit()"
  >
    <slot
      :is-smart-sorted="state.isSmartSorted"
      :is-virtual-replica="state.isVirtualReplica"
      :refine="state.refine"
    >
      <div
        :class="suit('text')"
      >
        <slot
          name="text"
          :is-smart-sorted="state.isSmartSorted"
        />
      </div>
      <button
        type="button"
        :class="suit('button')"
        @click="refine()"
      >
        <slot
          name="button"
          :is-smart-sorted="state.isSmartSorted"
        >{{ state.isSmartSorted ? 'See all results' : 'See relevant results' }}</slot>
      </button>
    </slot>
  </div>
</template>

<script>
import { connectSmartSort } from 'instantsearch.js/es/connectors';
import { createWidgetMixin } from '../mixins/widget';
import { createSuitMixin } from '../mixins/suit';

export default {
  name: 'AisSmartSort',
  mixins: [
    createSuitMixin({ name: 'SmartSort' }),
    createWidgetMixin({ connector: connectSmartSort }),
  ],
  methods: {
    refine() {
      if (this.state.isSmartSorted) {
        this.state.refine(0);
      } else {
        this.state.refine(undefined);
      }
    },
  },
};
</script>
