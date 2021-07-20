import { createInstantSearchComponent } from '../util/createInstantSearchComponent';
import { isVue3, renderCompat } from '../util/vue-compat';

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
  render: renderCompat(function(h) {
    return h(
      'div',
      {
        class: {
          [this.suit()]: true,
          [this.suit('', 'ssr')]: true,
        },
      },
      isVue3
        ? this.$slots.default && this.$slots.default()
        : this.$slots.default
    );
  }),
});
