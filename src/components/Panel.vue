<template>
  <div :class="[suit(), !canRefine && suit('', 'noRefinement')]">
    <div
      v-if="headerSlot"
      :class="suit('header')"
    >
      <slot
        name="header"
        :has-refinements="canRefine"
      />
    </div>
    <div :class="suit('body')">
      <slot :has-refinements="canRefine" />
    </div>
    <div
      v-if="footerSlot"
      :class="suit('footer')"
    >
      <slot
        name="footer"
        :has-refinements="canRefine"
      />
    </div>
  </div>
</template>

<script>
import { isVue3 } from 'vue-demi';
import { createPanelProviderMixin } from '../mixins/panel';
import { createSuitMixin } from '../mixins/suit';

export default {
  name: 'AisPanel',
  mixins: [createSuitMixin({ name: 'Panel' }), createPanelProviderMixin()],
  computed: {
    headerSlot() {
      // $scopedSlots doesn't exist in Vue3
      return isVue3
        ? this.$slots.header
        : this.$slots.header || this.$scopedSlots.header;
    },
    footerSlot() {
      return isVue3
        ? this.$slots.footer
        : this.$slots.footer || this.$scopedSlots.footer;
    },
  },
};
</script>
