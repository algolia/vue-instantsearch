import { isVue3, Vue2, createApp, Vue, renderCompat } from '../util/vue-compat';
import InstantSearch from '../instantsearch';
import { AisInstantSearch } from '../widgets';

const renderlessComponents = ['AisExperimentalConfigureRelatedItems'];
const nonWidgetComponents = [
  'AisInstantSearch',
  'AisInstantSearchSsr',
  'AisHighlight',
  'AisSnippet',
  'AisPanel',
  'AisPoweredBy',
];

function getAllComponents() {
  let calls;
  if (isVue3) {
    const app = createApp();
    app.component = jest.fn();
    app.use(InstantSearch);
    calls = app.component.mock.calls;
  } else {
    Vue2.component = jest.fn();
    Vue2.use(InstantSearch);
    calls = Vue2.component.mock.calls;
  }

  return calls.map(([installedName, call]) => {
    const { name, mixins } = call;
    let suitClass = `Error! ${name} is missing the suit classes`;
    let widget = `Error! ${name} is missing the widget`;

    try {
      suitClass = mixins
        .find(mixin => mixin.methods && mixin.methods.suit)
        .methods.suit();
    } catch (e) {
      /* no suit class, so will fail the assertions */
    }

    try {
      if (nonWidgetComponents.includes(name)) {
        throw new Error('not a widget');
      }
      const vm = new Vue({
        render: renderCompat(h =>
          h(
            AisInstantSearch,
            {
              props: {
                indexName: 'instant_search',
                searchClient: {
                  search() {
                    return new Promise({ results: [] });
                  },
                },
              },
            },
            [
              h(call, {
                props: {
                  indexName: 'index',
                  attribute: 'attr',
                  attributes: ['attr'],
                  hit: {},
                  label: '',
                  items: [{ default: true, value: 1, label: 'one' }],
                  trackedFilters: {},
                  matchingPatterns: {},
                },
                ref: 'widgetComponent',
              }),
            ]
          )
        ),
      }).$mount();
      widget = vm.$refs.widgetComponent.widget;
    } catch (e) {
      /* no widget, so will fail the assertions */
    }

    return {
      installedName,
      name,
      suitClass,
      widget,
    };
  });
}

const components = getAllComponents();

describe('DOM component', () => {
  test.each(
    components.filter(
      ({ name }) => renderlessComponents.includes(name) === false
    )
  )(
    '$name should have the same `name` as suit class',
    ({ name, installedName, suitClass }) => {
      expect(installedName).toBe(name);
      if (name === 'AisInstantSearchSsr') {
        expect(suitClass).toBe(`ais-InstantSearch`);
      } else if (name === 'AisExperimentalDynamicWidgets') {
        expect(suitClass).toBe(`ais-DynamicWidgets`);
      } else {
        expect(suitClass).toBe(`ais-${name.substr(3)}`);
      }
    }
  );
});

describe('installed widget', () => {
  test.each(
    components.filter(
      ({ name }) => nonWidgetComponents.includes(name) === false
    )
  )('sets widgetType $name', ({ name, widget }) => {
    if (name === 'AisExperimentalDynamicWidgets') {
      expect(widget.$$widgetType).toBe('ais.dynamicWidgets');
    } else if (name === 'AisExperimentalConfigureRelatedItems') {
      expect(widget.$$widgetType).toBe('ais.configureRelatedItems');
    } else {
      expect(widget.$$widgetType).toBe(
        `ais.${name[3].toLowerCase()}${name.substr(4)}`
      );
    }
  });
});
