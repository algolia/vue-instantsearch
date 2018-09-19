import { mount, createLocalVue } from '@vue/test-utils';
import { createSuitMixin } from '../suit';

const createFakeComponent = localVue =>
  localVue.component('Test', {
    render: () => null,
  });

it('exposes the regular suit function for this widget', () => {
  const localVue = createLocalVue();
  const Test = createFakeComponent(localVue);

  const {
    vm: { suit },
  } = mount(Test, {
    mixins: [createSuitMixin({ name: 'Test' })],
  });

  expect(suit()).toBe('ais-Test');
  expect(suit('', 'ok')).toBe('ais-Test--ok');
  expect(suit('ok')).toBe('ais-Test-ok');
  expect(suit('ok', 'there')).toBe('ais-Test-ok--there');
});
