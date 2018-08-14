import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('ToggleRefinement', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `
      <ais-toggle-refinement />
    `,
  }));
