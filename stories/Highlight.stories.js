import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('ais-highlight', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `
    <div>
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2><ais-highlight attribute="name" :hit="item"></ais-highlight></h2>
          <small><ais-highlight attribute="description" :hit="item"></ais-highlight></small>
        </div>
      </ais-hits>
    </div>
  `,
  }))
  .add('with array value', () => ({
    template: `
    <div>
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <p><ais-highlight attribute="categories.0" :hit="item"></ais-highlight></p>
          <p><ais-highlight attribute="categories.1" :hit="item"></ais-highlight></p>
        </div>
      </ais-hits>
    </div>
  `,
  }))
  .add('with highlighted tag name', () => ({
    template: `
    <div>
      <ais-hits>
        <div slot="item" slot-scope="{ item }">
          <h2>
            <ais-highlight attribute="name" :hit="item" highlighted-tag-name="span"></ais-highlight>
          </h2>
          <small>
            <ais-highlight attribute="description" :hit="item" highlighted-tag-name="span"></ais-highlight>
          </small>
        </div>
      </ais-hits>
    </div>
    `,
  }));
