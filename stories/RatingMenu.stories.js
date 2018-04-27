import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('RatingMenu', module)
  .addDecorator(previewWrapper)
  .add('default', () => ({
    template: `<ais-rating-menu attributeName="rating"></ais-rating-menu>`,
  }));
