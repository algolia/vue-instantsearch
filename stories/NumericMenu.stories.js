import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('NumericMenu', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `
      <div>
        <p>
          <button @click="forceUpdate">Force update</button>
          <button @click="updateAttribute">Update attribute to "{{ label }}"</button>
        </p>
        <ais-numeric-menu
          :attribute="attribute"
          :items="[
            { label: 'All' },
            { label: '<= 10$', end: 10 },
            { label: '10$ - 100$', start: 10, end: 100 },
            { label: '100$ - 500$', start: 100, end: 500 },
            { label: '>= 500$', start: 500 },
          ]"
        />
      </div>
    `,
    data() {
      return {
        attribute: 'price',
        items: [
          { label: 'All' },
          { label: '<= 10$', end: 10 },
          { label: '10$ - 100$', start: 10, end: 100 },
          { label: '100$ - 500$', start: 100, end: 500 },
          { label: '>= 500$', start: 500 },
        ],
      };
    },
    computed: {
      label() {
        return this.attribute === 'popularity' ? 'price' : 'popularity';
      },
    },
    methods: {
      forceUpdate() {
        this.$forceUpdate();
      },
      updateAttribute() {
        this.attribute =
          this.attribute === 'popularity' ? 'price' : 'popularity';
      },
    },
  }))
  .add('with transformItems', () => ({
    template: `
      <div>
        <p>
          <button @click="forceUpdate">Force update</button>
        </p>
        <ais-numeric-menu
          attribute="price"
          :items="[
            { label: 'All' },
            { label: '<= 10$', end: 10 },
            { label: '10$ - 100$', start: 10, end: 100 },
            { label: '100$ - 500$', start: 100, end: 500 },
            { label: '>= 500$', start: 500 },
          ]"
          :transformItems="items => items"
        />
      </div>
    `,
    methods: {
      forceUpdate() {
        this.$forceUpdate();
      },
      transformItems(items) {
        return items.map(item =>
          Object.assign({}, item, { label: `👉 ${item.label}` })
        );
      },
    },
  }))
  .add('with a custom render', () => ({
    template: `
      <ais-numeric-menu
        attribute="price"
        :items="[
          { label: 'All' },
          { label: '<= 10$', end: 10 },
          { label: '10$ - 100$', start: 10, end: 100 },
          { label: '100$ - 500$', start: 100, end: 500 },
          { label: '>= 500$', start: 500 },
        ]"
      >
        <ul slot-scope="{ items, canRefine, refine, createURL }">
          <li
            v-for="item in items"
            :key="item.label"
            :style="{ fontWeight: item.isRefined ? 600 : 400 }"
          >
            <a
              :href="createURL(item.value)"
              @click.prevent="refine(item.value)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </ais-numeric-menu>
    `,
  }));
