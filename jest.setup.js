import createSerializer from 'jest-serializer-html/createSerializer';
import { isVue3, isVue2, Vue2 } from './src/util/vue-compat';

if (isVue2) {
  Vue2.config.productionTip = false;
}

expect.addSnapshotSerializer(
  createSerializer({
    print: {
      sortAttributes: names => names.sort(),
    },
  })
);

const toHaveBooleanAttribute = attribute => wrapper => {
  // vue2: https://codesandbox.io/s/optimistic-blackwell-enw30
  // vue3: https://codesandbox.io/s/affectionate-vaughan-f6sf0
  const value = wrapper.attributes(attribute);
  if ((isVue2 && value === attribute) || (isVue3 && value === '')) {
    return { pass: true };
  } else {
    return {
      pass: false,
      message: () => `expected ${wrapper} to have \`${attribute}\` attribute`,
    };
  }
};

expect.extend({
  toHaveEmptyHTML: wrapper => {
    const html = wrapper.html();
    if (
      (isVue2 && html === '') ||
      (isVue3 && ['<!---->', '<!--v-if-->'].includes(html))
    ) {
      return {
        pass: true,
      };
    } else {
      return {
        pass: false,
        message: () => `expected ${html} to be an empty HTML string`,
      };
    }
  },
  toBeDisabled: toHaveBooleanAttribute('disabled'),
  toBeHidden: toHaveBooleanAttribute('hidden'),
  toBeAutofocused: toHaveBooleanAttribute('autofocus'),
});
