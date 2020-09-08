import { createInstantSearchComponent } from '../util/createInstantSearchComponent';
import * as Vue from 'vue';

export default createInstantSearchComponent({
  name: 'AisInstantSearchSsr',
  inject: {
    $_ais_ssrInstantSearchInstance: {
      default() {
        throw new Error('`createServerRootMixin` is required when using SSR.');
      },
    },
  },
  data() {
    return {
      instantSearchInstance: this.$_ais_ssrInstantSearchInstance,
    };
  },
  render(h) {
    return (Vue.h || h)(
      'div',
      {
        class: {
          [this.suit()]: true,
          [this.suit('', 'ssr')]: true,
        },
      },
      typeof this.$slots.default === 'function'
        ? this.$slots.default()
        : this.$slots.default
    );
  },
});
