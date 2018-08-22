import suit from './suit.js';

export default {
  inject: {
    instantSearchInstance: {
      name: 'instantSearchInstance',
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
    this.instantSearchInstance.addWidget(this.widget);
  },
  beforeDestroy() {
    this.instantSearchInstance.removeWidget(this.widget);
  },
  watch: {
    widgetParams(next, previous) {
      const { shouldUpdateWidgetParams } = this.$options;

      const widgetOptionNames = [
        ...new Set([...Object.keys(previous), ...Object.keys(next)]),
      ];

      const shouldUpdate = widgetOptionNames.some(widgetOptionName => {
        const predicate =
          shouldUpdateWidgetParams[widgetOptionName] || (() => true);

        return predicate(previous[widgetOptionName], next[widgetOptionName]);
      });

      if (shouldUpdate) {
        this.instantSearchInstance.removeWidget(this.widget);
        this.widget = this.widgetFactory(next);
        this.instantSearchInstance.addWidget(this.widget);
      }
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
