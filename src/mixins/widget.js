import { isVue3 } from '../util/vue-compat';
import { warn } from '../util/warn';
import { addWidget, forceRender, removeWidget } from '../util/widget';

export const createWidgetMixin = ({ connector } = {}) => ({
  inject: {
    instantSearchInstance: {
      from: '$_ais_instantSearchInstance',
      default() {
        const tag = this.$options._componentTag;
        throw new TypeError(
          `It looks like you forgot to wrap your Algolia search component "<${tag}>" inside of an "<ais-instant-search>" component.`
        );
      },
    },
    getParentIndex: {
      from: '$_ais_getParentIndex',
      default() {
        return () => this.instantSearchInstance.mainIndex;
      },
    },
  },
  data() {
    return {
      state: null,
    };
  },
  created() {
    if (typeof connector === 'function') {
      this.widget = addWidget(
        connector,
        this.getParentIndex(),
        this.widgetParams,
        this.updateState.bind(this)
      );
      forceRender(
        this.widget,
        this.getParentIndex(),
        this.instantSearchInstance
      );
    } else if (connector !== true) {
      warn(
        `You are using the InstantSearch widget mixin, but didn't provide a connector.
While this is technically possible, and will give you access to the Helper,
it's not the recommended way of making custom components.

If you want to disable this message, pass { connector: true } to the mixin.

Read more on using connectors: https://alg.li/vue-custom`
      );
    }
  },
  [isVue3 ? 'beforeUnmount' : 'beforeDestroy']() {
    removeWidget(this.widget, this.getParentIndex());
  },
  watch: {
    widgetParams: {
      handler(nextWidgetParams) {
        removeWidget(this.widget, this.getParentIndex());
        this.state = null;
        this.widget = addWidget(
          connector,
          this.getParentIndex(),
          this.instantSearchInstance,
          nextWidgetParams,
          this.updateState.bind(this)
        );
      },
      deep: true,
    },
  },
  methods: {
    updateState(state = {}, isFirstRender) {
      if (!isFirstRender) {
        // Avoid updating the state on first render
        // otherwise there will be a flash of placeholder data
        this.state = state;
      }
    },
  },
});
