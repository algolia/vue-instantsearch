/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
import { createLocalVue } from '@vue/test-utils';
import InstantSearch from '../instantsearch';

it('should have `name` the same as the suit class name everywhere', () => {
  const Vue = createLocalVue();
  Vue.component = jest.fn();
  Vue.use(InstantSearch);

  const allInstalledComponents = Vue.component.mock.calls;
  const components = allInstalledComponents.map(
    ([installedName, { name, mixins }]) => {
      let suitClass = `Error! ${name} is missing the suit classes`;

      try {
        suitClass = mixins
          .find(mixin => mixin.methods && mixin.methods.suit)
          .methods.suit();
      } catch (e) {
        /* no suit class! */
      }

      return {
        installedName,
        name,
        suitClass,
      };
    }
  );

  components.forEach(({ name, installedName, suitClass }) => {
    expect(installedName).toBe(name);
    expect(suitClass).toBe(`ais-${name.substr(3)}`);
  });
});
