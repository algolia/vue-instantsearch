import { mount } from '@vue/test-utils';
import Highlight from '../Highlight';

afterEach(() => {
  process.env.NODE_ENV = 'test';
});

test('renders proper HTML', () => {
  const result = {
    _highlightResult: {
      attr: {
        value: `con<em>ten</em>t`,
      },
    },
  };

  const wrapper = mount(Highlight, {
    context: {
      props: {
        attributeName: 'attr',
        result,
      },
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should render an empty string in production if attribute is not highlighted', () => {
  process.env.NODE_ENV = 'production';
  const result = {
    _highlightResult: {},
  };

  const wrapper = mount(Highlight, {
    context: {
      props: {
        attributeName: 'attr',
        result,
      },
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should warn when not in production if attribute is not highlighted', () => {
  global.console.warn = jest.fn();

  const result = {
    _highlightResult: {},
  };

  mount(Highlight, {
    context: {
      props: {
        attributeName: 'attr',
        result,
      },
    },
  });

  expect(global.console.warn).toHaveBeenCalledTimes(1);
});

test('allows usage of dot delimited path to access nested attribute', () => {
  const result = {
    _highlightResult: {
      attr: {
        nested: {
          value: `nested <em>val</em>`,
        },
      },
    },
  };

  const wrapper = mount(Highlight, {
    context: {
      props: {
        attributeName: 'attr.nested',
        result,
      },
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
