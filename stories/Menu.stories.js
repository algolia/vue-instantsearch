import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('Menu', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `
      <div>
        <p>
          <button @click="forceUpdate">Force update</button>
          <button @click="updateAttribute">Update attribute to "{{ label }}"</button>
        </p>
        <ais-menu :attribute="attribute" />
      </div>
    `,
    data() {
      return {
        attribute: 'brand',
      };
    },
    computed: {
      label() {
        return this.attribute === 'categories' ? 'brand' : 'categories';
      },
    },
    methods: {
      forceUpdate() {
        this.$forceUpdate();
      },
      updateAttribute() {
        this.attribute =
          this.attribute === 'categories' ? 'brand' : 'categories';
      },
    },
  }))
  .add('with show more', () => ({
    template: `
      <ais-menu attribute="brand" :limit="2" :showMoreLimit="5" :show-more="true" />
    `,
  }))
  .add('with custom label', () => ({
    template: `
      <ais-menu attribute="brand" :limit="2" :showMoreLimit="5" :show-more="true">
        <template slot="showMoreLabel" slot-scope="{ isShowingMore }">
          {{isShowingMore ? 'View less' : 'View more'}}
        </template>
      </ais-menu>
    `,
  }))
  .add('with a different sort', () => ({
    template: `
      <ais-menu attribute="brand" :sort-by="['isRefined:desc', 'name:asc']" />
    `,
  }))
  .add('with a custom render', () => ({
    template: `
      <ais-menu attribute="brand">
        <ol slot-scope="{ items, createURL, refine }">
          <li
            v-for="item in items"
            :key="item.value"
            :style="{ fontWeight: item.isRefined ? 600 : 400 }"
          >
            <a
              :href="createURL(item.value)"
              @click.prevent="refine(item.value)"
            >
              {{item.label}} - {{item.count}}
            </a>
          </li>
        </ol>
      </ais-menu>
    `,
  }));
