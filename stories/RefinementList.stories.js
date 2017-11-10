import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('RefinementList', module)
  .addDecorator(previewWrapper)
  .add('default', () => ({
    template: `<ais-refinement-list attribute-name="materials"></ais-refinement-list>`,
  }))
  .add('custom rendering', () => ({
    template: `<ais-refinement-list attribute-name="materials">
      <h3 slot="header">Materials</h3>
      <hr slot="footer" />
    </ais-refinement-list>`,
  }));
