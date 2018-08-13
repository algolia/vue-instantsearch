import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('RangeInput', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `<ais-range-input attribute-name="price"></ais-range-input>`,
  }));
