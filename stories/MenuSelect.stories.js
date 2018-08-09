import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';
import MenuSelect from '../src/components/MenuSelect.vue';

storiesOf('MenuSelect', module)
  .addDecorator(previewWrapper)
  .add('simple usage', () => ({
    template: '<ais-menu-select attribute="brand" />',
  }))
  .add('with a limit', () => ({
    template: `
      <ais-menu-select
        attribute="brand"
        :limit="5"
      />
    `,
  }))
  .add('custom sort', () => ({
    template: `
      <ais-menu-select
        attribute="brand"
        :sort-by="['name:desc']"
      />
    `,
  }))
  .add('custom label', () => ({
    template: `
      <ais-menu-select
        attribute="brand"
        label="None"
      />
    `,
  }))
  .add('custom rendering', () => ({
    render: h => (
      <MenuSelect
        attribute="brand"
        scopedSlots={{
          default: ({ items, canRefine, refine }) => (
            <select
              slot-scope="{ items, canRefine, refine }"
              onChange={event => refine(event.currentTarget.value)}
              disabled={!canRefine}
            >
              <option value="">All</option>
              {items.map(item => (
                <option
                  key={item.value}
                  value={item.value}
                  selected={item.isRefined}
                >
                  {item.label}
                </option>
              ))}
            </select>
          ),
        }}
      />
    ),
  }));
