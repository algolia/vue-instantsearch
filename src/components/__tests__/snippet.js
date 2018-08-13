import { mount } from '@vue/test-utils';
import Snippet from '../Snippet';

afterEach(() => {
  process.env.NODE_ENV = 'test';
});

test('renders proper HTML', () => {
  const result = {
    _snippetResult: {
      attr: {
        value: `con<em>ten</em>t`,
      },
    },
  };

  const wrapper = mount(Snippet, {
    context: {
      props: {
        attributeName: 'attr',
        result,
      },
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should render an empty string in production if attribute is not snippeted', () => {
  process.env.NODE_ENV = 'production';
  const result = {
    _snippetResult: {},
  };
  global.console.warn = jest.fn();

  const wrapper = mount(Snippet, {
    context: {
      props: {
        attributeName: 'attr',
        result,
      },
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
  expect(global.console.warn).not.toHaveBeenCalled();
});

test('should warn when not in production if attribute is not snippeted', () => {
  global.console.warn = jest.fn();

  const result = {
    _snippetResult: {},
  };
  mount(Snippet, {
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
    _snippetResult: {
      attr: {
        nested: {
          value: `nested <em>val</em>`,
        },
      },
    },
  };

  const wrapper = mount(Snippet, {
    context: {
      props: {
        attributeName: 'attr.nested',
        result,
      },
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
