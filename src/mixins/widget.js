const defaultShouldUpdate = (previous, next) => previous !== next;

export const createWidgetMixin = ({ connect }) => ({
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
  computed: {
    widgetParams() {
      const { widgetParams } = this.$options;

      return Object.keys(widgetParams).reduce(
        (acc, name) => ({
          ...acc,
          [name]: widgetParams[name].getValue(this),
        }),
        {}
      );
    },
  },
  watch: {
    widgetParams(next, previous) {
      const { widgetParams } = this.$options;

      const shouldUpdateWidget = Object.keys(widgetParams).some(name => {
        const { shouldUpdate = defaultShouldUpdate } = widgetParams[name];

        return shouldUpdate(previous[name], next[name]);
      });

      if (shouldUpdateWidget) {
        this.instantSearchInstance.removeWidget(this.widget);
        this.widget = this.widgetFactory(next);
        this.instantSearchInstance.addWidget(this.widget);
      }
    },
  },
  created() {
    this.widgetFactory = connect(this.updateData, () => {});
    this.widget = this.widgetFactory(this.widgetParams);
    this.instantSearchInstance.addWidget(this.widget);
  },
  beforeDestroy() {
    this.instantSearchInstance.removeWidget(this.widget);
  },
  methods: {
    updateData(state = {}) {
      this.state = state;
    },
  },
});
