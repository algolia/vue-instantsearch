import suit from '../util/suit';

export const createSuitMixin = ({ name }) => ({
  props: {
    classNames: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    suit(element, modifier) {
      const className = suit(name, element, modifier);
      const userClassName = this.classNames && this.classNames[className];
      return [className, userClassName];
    },
  },
});
