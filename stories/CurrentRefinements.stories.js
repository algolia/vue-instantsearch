import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';

storiesOf('CurrentRefinements', module)
  .addDecorator(previewWrapper)
  .add('with menu', () => ({
    template: `<div>
      <ais-current-refinements></ais-current-refinements>
      <ais-menu attribute="materials"></ais-menu>
    </div>`,
  }))
  .add('with range', () => ({
    template: `<div>
      <ais-current-refinements></ais-current-refinements>
      <ais-price-range
        attribute-name="price"
        :classNames="{
          'ais-price-range__input': 'form-control'
        }"
      >
      </ais-price-range>
    </div>`,
  }))
  .add('with tree menu', () => ({
    template: `<div>
      <ais-current-refinements></ais-current-refinements>
      <ais-tree-menu :attributes="['category', 'sub_category']"></ais-tree-menu>
    </div>`,
  }));
