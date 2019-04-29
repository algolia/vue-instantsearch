import { mount } from '@vue/test-utils';
import QueryRuleCustomData from '../QueryRuleCustomData.vue';
import { __setState } from '../../mixins/widget';
jest.mock('../../mixins/widget');

it('renders in a list of <pre> by default', () => {
  __setState({
    items: ['this is user data', 'this too!'],
  });
  const wrapper = mount(QueryRuleCustomData);
  expect(wrapper.html()).toMatchInlineSnapshot(`

<div>
  <div>
    <pre>
      this is user data
    </pre>
  </div>
  <div>
    <pre>
      this too!
    </pre>
  </div>
</div>

`);
});

it('accepts transformItems', () => {
  const transformItems = jest.fn();
  const wrapper = mount(QueryRuleCustomData, {
    propsData: {
      transformItems,
    },
  });

  expect(wrapper.vm.widgetParams).toEqual({
    transformItems,
  });
});
