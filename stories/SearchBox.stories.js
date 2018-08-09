import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';
import SearchBox from '../src/components/SearchBox.vue';

storiesOf('SearchBox', module)
  .addDecorator(previewWrapper)
  .add('default', () => ({
    render: h => <SearchBox />,
  }))
  .add('with loading indicator', () => ({
    template: '<ais-search-box showLoadingIndicator></ais-search-box>',
  }))
  .add('with autofocus', () => ({
    template: '<ais-search-box autofocus></ais-search-box>',
  }))
  .add('with custom rendering', () => ({
    template: `<ais-search-box autofocus>
      <input
        placeholder="Custom SearchBox"
        slot-scope="{ refine }"
        @input="refine($event.currentTarget.value)"
      >
    </ais-search-box>`,
  }));
