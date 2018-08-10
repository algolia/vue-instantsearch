import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('RangeInput', module)
  .addDecorator(previewWrapper)
  .add('simple usage', () => ({
    template: `<div></div>`,
  }));
