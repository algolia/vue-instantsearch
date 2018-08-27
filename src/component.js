import suit from './suit';

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
    this.factory = this.connector(this.updateState, () => {});
    this.widget = this.factory(this.widgetParams);
    this.instantSearchInstance.addWidget(this.widget);
  },
  beforeDestroy() {
    this.instantSearchInstance.removeWidget(this.widget);
  },
  watch: {
    widgetParams(nextWidgetParams) {
      this.instantSearchInstance.removeWidget(this.widget);
      this.widget = this.factory(nextWidgetParams);
      this.instantSearchInstance.addWidget(this.widget);
    },
  },
  methods: {
    suit(...args) {
      return suit(this.widgetName, ...args);
    },
    updateState(state = {}, isFirstRender) {
      if (!isFirstRender) {
        // Avoid to update the state on first render
        // otherwise we have a flash from empty state
        // to the next state
        this.state = state;
      }
    },
  },
};
