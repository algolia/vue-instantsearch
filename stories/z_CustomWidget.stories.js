import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';
import { createAlgoliaMixin } from '../src/instantsearch';

// Space & Arabic character before the text is to make it sort last
storiesOf('Fully Custom Widgets', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    mixins: [createAlgoliaMixin()],
    template: `
      <button @click="toggle">
        Toggle a "brand:Amazon" with the Helper
      </button>
    `,
    methods: {
      toggle() {
        const { helper } = this.instantSearchInstance;
        helper.toggleRefine('brand', 'Amazon').search();
      },
    },
  }));
