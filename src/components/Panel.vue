<template>
  <div :class="[suit(), !canRefine && suit('', 'noRefinement')]">
    <div
      v-if="$slots.header"
      :class="suit('header')"
    >
      <slot
        name="header"
        no-refinement="!canRefine"
      />
    </div>
    <div :class="suit('body')">
      <slot no-refinement="!canRefine" />
    </div>
    <div
      v-if="$slots.footer"
      :class="suit('footer')"
    >
      <slot
        name="footer"
        no-refinement="!canRefine"
      />
    </div>
  </div>
</template>

<script>
import { createPanelProviderMixin } from '../mixins/panel';
import { createSuitMixin } from '../mixins/suit';

export default {
  name: 'AisPanel',
  mixins: [createSuitMixin({ name: 'Panel' }), createPanelProviderMixin()],
};
</script>
