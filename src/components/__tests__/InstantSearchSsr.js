import InstantSearchSsr from '../InstantSearchSsr.vue';
import { mount } from '@vue/test-utils';

it('to require an injected instantsearch instance ($_ais)', () => {
  expect(() => mount(InstantSearchSsr)).toThrowErrorMatchingInlineSnapshot(
    `"When using SSR, it is required to use the rootMixin"`
  );
});

// it('to use the provided instantsearch instance', () => {
//   const wrapper = mount(InstantSearchSsr, {
//     provide: {
//       $_ais() {
//         return {
//           client: {},
//         };
//       },
//     },
//   });
// });
