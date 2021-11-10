import { mount } from '../../../test/utils';
import ExperimentalDynamicWidgets from '../ExperimentalDynamicWidgets';
import { warn } from '../../util/warn';
import { __setState } from '../../mixins/widget';
import DynamicWidgets from '../DynamicWidgets';

jest.mock('../../mixins/widget');
jest.mock('../../util/warn', () => ({ warn: jest.fn() }));

it('warns on mount', () => {
  __setState(null);

  mount({
    template: '<ExperimentalDynamicWidgets />',
    components: {
      ExperimentalDynamicWidgets,
    },
  });
  expect(warn).toHaveBeenCalledTimes(1);
  expect(warn.mock.calls[0][0]).toMatchInlineSnapshot(
    `"Use AisDynamicWidgets instead of AisExperimentalDynamicWidgets."`
  );
});

it('behaves the same as DynamicWidgets', () => {
  Object.keys(ExperimentalDynamicWidgets).forEach(key => {
    if (key === 'name') {
      // name is different
      expect(ExperimentalDynamicWidgets[key]).toBe(
        'AisExperimentalDynamicWidgets'
      );
    } else if (key === 'mounted') {
      // mounted has the warning
      expect(ExperimentalDynamicWidgets[key]).toEqual(expect.any(Function));
    } else if (key[0] === '_') {
      // private Vue behavior, not tested
    } else {
      expect(ExperimentalDynamicWidgets[key]).toEqual(DynamicWidgets[key]);
    }
  });
});
