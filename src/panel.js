import Vue from 'vue';

export const PANEL_EMITTER_NAMESPACE = 'instantSearchPanelEmitter';
export const PANEL_CHANGE_EVENT = 'PANEL_CHANGE_EVENT';

export const createPanelProviderMixin = () => ({
  props: {
    emitter: {
      type: Object,
      required: false,
      default() {
        return new Vue();
      },
    },
  },
  provide() {
    return {
      [PANEL_EMITTER_NAMESPACE]: this.emitter,
    };
  },
  data() {
    return {
      canRefine: true,
    };
  },
  created() {
    this.emitter.$on(PANEL_CHANGE_EVENT, value => {
      this.updateCanRefine(value);
    });
  },
  destroyed() {
    this.emitter.$destroy();
  },
  methods: {
    updateCanRefine(value) {
      this.canRefine = value;
    },
  },
});

export const createPanelConsumerMixin = ({ attribute }) => ({
  inject: {
    emitter: {
      from: PANEL_EMITTER_NAMESPACE,
      default() {
        return {
          $emit: () => {},
        };
      },
    },
  },
  data() {
    return {
      state: null,
    };
  },
  watch: {
    state(next, previous) {
      if (previous && next && previous[attribute] !== next[attribute]) {
        this.emitter.$emit(PANEL_CHANGE_EVENT, next[attribute]);
      }
    },
  },
});
