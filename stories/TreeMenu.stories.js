import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('TreeMenu', module)
  .addDecorator(previewWrapper)
  .add('default', () => ({
    template: `
    <ais-tree-menu
      :attributes="[
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2'
      ]"
    ></ais-tree-menu>
    `,
  }));
