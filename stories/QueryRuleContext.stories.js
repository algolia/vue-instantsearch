import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('ais-query-rule-context', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    template: `<ais-query-rule-context :tracked-filters="trackedFilters" />`,
    data() {
      return {
        trackedFilters: {
          brand: filters => filters,
        },
      };
    },
  }))
  .add('static list with transform', () => ({
    template: `
      <ais-query-rule-context
        :tracked-filters="trackedFilters"
        :transform-rule-contexts="transformRuleContexts"
      />`,
    data() {
      return {
        trackedFilters: {
          brand: filters => filters,
        },
        transformRuleContexts: () => ['i-like-ice-cream'],
      };
    },
  }));
