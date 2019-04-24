import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('ais-voice-search', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: '<ais-voice-search></ais-voice-search>',
  }));
