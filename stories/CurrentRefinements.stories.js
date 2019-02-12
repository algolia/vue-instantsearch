import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';
import { withKnobs } from '@storybook/addon-knobs/vue';

storiesOf('ais-current-refinements', module)
  .addDecorator(previewWrapper())
  .addDecorator(withKnobs)
  .add('default', () => ({
    template: `
      <ais-current-refinements />
    `,
  }))
  .add('with a refinement to clear', () => ({
    template: `
      <ais-current-refinements :excluded-attributes="[]" />
    `,
  }))
  .add('with multiple refinements to clear', () => ({
    template: `
      <div>
        <ais-current-refinements :excluded-attributes="[]" />
        <hr />
        <ais-hierarchical-menu
          :attributes="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
          ]"
        />
        <hr />
        <ais-range-input attribute="price" />
      </div>
    `,
  }))
  .add('with excluded attributes', () => ({
    template: `
      <div>
        <p><strong>excludes: Brand</strong>
        <ais-current-refinements
          :excluded-attributes="['brand']"
        />
        <hr />
        <ais-hierarchical-menu
          :attributes="[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
          ]"
        />
        <hr />
        <ais-range-input attribute="price" />
      </div>
    `,
  }))
  .add('with transform items', () => ({
    template: `
      <ais-current-refinements :transform-items="transformItems" />
    `,
    methods: {
      transformItems(items) {
        return items.map(item =>
          Object.assign({}, item, {
            attribute: item.label.toLocaleUpperCase(),
            refinements: item.refinements.map(refinement =>
              Object.assign({}, refinement, {
                label: refinement.label.toLocaleUpperCase(),
              })
            ),
          })
        );
      },
    },
  }))
  .add('with custom item rendering', () => ({
    template: `
      <ais-current-refinements :excluded-attributes="[]">
        <template slot="item" slot-scope="{ item, refine }">
          <span style="color: white">
            {{item.label}}
            <ul>
              <li v-for="(refinement, index) in item.refinements" :key="index">
                <button @click="refine(refinement)">
                  {{refinement.label}} ╳
                </button>
              </li>
            </ul>
          </span>
        </template>
      </ais-current-refinements>
    `,
  }))
  .add('with custom refinement rendering', () => ({
    template: `
      <ais-current-refinements :excluded-attributes="[]">
        <template slot="refinement" slot-scope="{ refinement, refine }">
          <button
            @click="refine(refinement)"
            style="color: white"
          >
            {{refinement.label}} ╳
          </button>
        </template>
      </ais-current-refinements>
    `,
  }))
  .add('with full custom rendering', () => ({
    template: `
      <ais-current-refinements :excluded-attributes="[]">
        <template slot-scope="{ refine, items, createURL }">
          <ul>
            <li
              v-for="item in items"
              :key="item.attribute"
              >
              {{item.attribute}}: 
              <button
                v-for="refinement in item.refinements"
                @click="item.refine(refinement)"
                :key="refinement.value"
              >
                {{refinement.label}} ╳
              </button>
            </li>
          </ul>
        </template>
      </ais-current-refinements>
    `,
  }));
