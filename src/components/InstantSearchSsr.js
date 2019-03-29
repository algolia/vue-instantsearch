import { createInstantSearchComponent } from '../util/createInstantSearchComponent';

export default createInstantSearchComponent({
  name: 'AisInstantSearchSsr',
  props: {
    indexName: {
      type: String,
      required: true,
    },
  },
  inject: {
    // should be possible to configure this with {camelcase: ['error', {allow: ['^\\$_']}]}
    // but that didn't work
    // eslint-disable-next-line camelcase
    $_ais: {
      from() {
        return `$_ais-${this.indexName}`;
      },
      default() {
        throw new Error('`rootMixin` is required when using SSR.');
      },
    },
  },
  data() {
    return {
      instantSearchInstance: this.$_ais,
    };
  },
  render(createElement) {
    return createElement(
      'div',
      {
        class: {
          [this.suit()]: true,
          [this.suit('', 'ssr')]: true,
        },
      },
      this.$slots.default
    );
  },
});
