import { mount } from '@vue/test-utils';

import Template from '../Stats.vue';

jest.mock('../../component', () => ({
  data() {
    return {
      state: {
        hitsPerPage: 50,
        nbPages: 20,
        nbHits: 1000,
        page: 2,
        processingTimeMS: 12,
        query: 'ipho',
      },
    };
  },
}));

describe('Template', () => {
  describe('html', () => {
    it('should render correctly', () => {
      const wrapper = mount(Template);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('widgetParams', () => {
    it('correct defaults', () => {
      const wrapper = mount(Template);

      const { widgetParams } = wrapper.vm;

      expect(widgetParams).toBe(undefined);
    });

    it('allows overriding', () => {
      const wrapper = mount(Template, {
        propsData: {
          someProp: ['hi'],
        },
      });

      const { widgetParams } = wrapper.vm;

      expect(widgetParams).toBe(undefined);
    });
  });
});
