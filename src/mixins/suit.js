import suit from '../util/suit';

export const createSuitMixin = ({ name }) => ({
  props: {
    classNames: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    suit(...args) {
      const className = suit(name, ...args);
      if (this.classNames && this.classNames[className]) {
        return this.classNames[className];
      }
      return className;
    },
  },
});
