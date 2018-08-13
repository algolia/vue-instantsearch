import { getPropertyByPath } from '../util/object';
import { warn } from '../util/warn';

export default {
  functional: true,
  props: {
    result: {
      type: Object,
      required: true,
    },
    attributeName: {
      type: String,
      required: true,
    },
  },
  render(h, ctx) {
    const result = ctx.props.result;
    const attributeName = ctx.props.attributeName;

    const attributePath = `_snippetResult.${attributeName}.value`;
    const attributeValue = getPropertyByPath(result, attributePath);

    if (process.env.NODE_ENV !== 'production' && attributeValue === undefined) {
      warn(
        `The "${attributeName}" attribute might currently not be configured to be snippeted in Algolia.
        See https://www.algolia.com/doc/api-reference/api-parameters/attributesToSnippet/.`
      );
    }

    return h('span', {
      class: {
        'ais-Snippet': true,
      },
      domProps: {
        innerHTML: attributeValue,
      },
    });
  },
};
