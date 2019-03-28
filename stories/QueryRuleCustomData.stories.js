import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('ais-query-rule-custom-data', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    template: `<ais-query-rule-custom-data/>`,
  }))
  .add('static list with transform', () => ({
    template: `
      <ais-query-rule-custom-data
        :transform-items="transformItems"
      />`,
    data() {
      return {
        transformItems: () => [{ message: 'Hello World!' }],
      };
    },
  }))
  .add('picking first with transform', () => ({
    template: `
      <ais-query-rule-custom-data
        :transform-items="transformItems"
      />`,
    data() {
      return {
        transformItems: items => [items[0]],
      };
    },
  }));
