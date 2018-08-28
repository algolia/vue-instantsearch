import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

storiesOf('HitsPerPage', module)
  .addDecorator(previewWrapper())
  .add('simple usage', () => ({
    template: `<ais-hits-per-page :items="[{
        label: '10 results', value: 10, default: true,
      }, {
        label: '20 results', value: 20
      }]"></ais-hits-per-page>`,
  }))
  .add('default on second element', () => ({
    template: `<ais-hits-per-page :items="[{
        label: '10 results', value: 10
      }, {
        label: '20 results', value: 20, default: true
      }]"></ais-hits-per-page>`,
  }))
  .add('custom rendering: radio buttons', () => ({
    template: `<ais-hits-per-page :items="[{
        label: '10 results', value: 10
      }, {
        label: '20 results', value: 20, default: true
      }]">
        <div slot-scope="{items, refine}">
          <label
            v-for="(item, itemIndex) in items"
            @change="refine(item.value)">{{item.label}}
            <input type="radio" :checked="item.isRefined === true" />
          </label>
        </div>
      </ais-hits-per-page>`,
  }))
  .add('with a Panel', () => ({
    template: `
      <ais-panel>
        <template slot="header">Hits per page</template>
        <ais-hits-per-page
          :items="[
            { label: '10 results', value: 10, default: true },
            { label: '20 results', value: 20 }
          ]"
        />
        <template slot="footer">Footer</template>
      </ais-panel>
    `,
  }));
