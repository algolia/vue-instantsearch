import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('RefinementList', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `<ais-refinement-list attribute="brand"></ais-refinement-list>`,
  }))
  .add('with searchbox', () => ({
    template: `
      <ais-refinement-list 
        attribute="brand"
        searchable
      >
      </ais-refinement-list>`,
  }))
  .add('with show more', () => ({
    template: `
      <ais-refinement-list 
        attribute="brand"
        show-more
      >
      </ais-refinement-list>`,
  }))
  .add('custom rendering', () => ({
    template: `<ais-refinement-list attribute="brand">
      <h3 slot="header">Materials</h3>
      <hr slot="footer" />
    </ais-refinement-list>`,
  }));
