import { createInstantSearchComponent } from '../util/createInstantSearchComponent';

export default createInstantSearchComponent({
  name: 'AisInstantSearchSsr',
  inject: {
    // should be possible to configure this with {camelcase: ['error', {allow: ['^\\$_']}]}
    // but that didn't work
    // eslint-disable-next-line camelcase
    $_ais: {
      default() {
        throw new Error('When using SSR, it is required to use the rootMixin');
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
