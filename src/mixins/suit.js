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
      return [className, this.classNames && this.classNames[className]];
    },
  },
});
