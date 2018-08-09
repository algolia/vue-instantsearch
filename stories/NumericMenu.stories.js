import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('NumericMenu', module)
  .addDecorator(previewWrapper)
  .add('simple usage', () => ({
    template: `<ais-numeric-menu />`,
  }));
