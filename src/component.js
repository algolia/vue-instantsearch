import suit from './suit.js';

export default {
  inject: {
    _instantSearchInstance: {
      name: '_instantSearchInstance',
      default() {
        const tag = this.$options._componentTag;
        throw new TypeError(
          `It looks like you forgot to wrap your Algolia search component
          "<${tag}>" inside of an "<ais-index>" component.`
        );
      },
    },
  },
  data() {
    return {
      state: null,
    };
  },
  created() {
    this.widgetFactory = this.connector(this.updateData, () => {});
    this.widget = this.widgetFactory(this.widgetParams);
    this._instantSearchInstance.addWidget(this.widget);
  },
  beforeDestroy() {
    this._instantSearchInstance.removeWidget(this.widget);
  },
  watch: {
    widgetParams(newVal) {
      const oldWidget = this.widget;
      this.widget = this.widgetFactory(newVal);
      this._instantSearchInstance.addWidget(this.widget);
      this._instantSearchInstance.removeWidget(oldWidget);
    },
  },
  methods: {
    suit(...args) {
      return suit(this.widgetName, ...args);
    },
    updateData(state = {}) {
      this.state = state;
    },
  },
};
