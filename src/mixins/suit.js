import suit from '../util/suit';

export const createSuitMixin = ({ widgetName }) => ({
  methods: {
    suit(...args) {
      return suit(widgetName, ...args);
    },
  },
});
