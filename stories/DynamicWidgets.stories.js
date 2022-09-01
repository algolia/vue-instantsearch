import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('ais-dynamic-widgets', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    template: `
    <ais-dynamic-widgets :transform-items="transformItems">
      <ais-refinement-list attribute="brand"></ais-refinement-list>
      <ais-menu attribute="categories"></ais-menu>
      <ais-panel>
        <template v-slot:header>hierarchy</template>
        <ais-hierarchical-menu :attributes="hierarchicalCategories"></ais-hierarchical-menu>
      </ais-panel>
    </ais-dynamic-widgets>`,
    data() {
      return {
        hierarchicalCategories: [
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2',
        ],
      };
    },
  }))
  .add('with fallback', () => ({
    template: `
    <ais-dynamic-widgets :transform-items="transformItems">
      <ais-refinement-list attribute="brand"></ais-refinement-list>
      <ais-menu attribute="categories"></ais-menu>
      <ais-panel>
        <template v-slot:header>hierarchy</template>
        <ais-hierarchical-menu :attributes="hierarchicalCategories"></ais-hierarchical-menu>
      </ais-panel>

      <template v-slot:fallback="{ attribute }">
        <ais-panel>
          <template v-slot:header>{{ attribute }}</template>
          <ais-refinement-list :attribute="attribute" />
        </ais-panel>
      </template>
    </ais-dynamic-widgets>`,
    data() {
      return {
        hierarchicalCategories: [
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2',
        ],
      };
    },
  }));
