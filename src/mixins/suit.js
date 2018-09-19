import suit from '../util/suit';

export const createSuitMixin = ({ name }) => ({
  methods: {
    suit(...args) {
      return suit(name, ...args);
    },
  },
});
