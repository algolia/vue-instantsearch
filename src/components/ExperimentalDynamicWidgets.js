import AisDynamicWidgets from './DynamicWidgets';
import { warn } from '../util/warn';

// @MAJOR remove this file
export default Object.assign({}, AisDynamicWidgets, {
  name: 'AisExperimentalDynamicWidgets',
  mounted() {
    warn('use AisDynamicWidgets instead of AisExperimentalDynamicWidgets');
  },
});
