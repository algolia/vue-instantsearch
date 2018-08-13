import { getPropertyByPath } from '../util/object';
import { warn } from '../util/warn';

export default {
  functional: true,
  props: {
    hit: {
      type: Object,
      required: true,
    },
    attribute: {
      type: String,
      required: true,
    },
  },
  render(h, ctx) {
    const hit = ctx.props.hit;
    const attribute = ctx.props.attribute;

    const attributePath = `_snippetResult.${attribute}.value`;
    const attributeValue = getPropertyByPath(hit, attributePath);

    if (process.env.NODE_ENV !== 'production' && attributeValue === undefined) {
      warn(
        `The "${attribute}" attribute might currently not be configured to be snippeted in Algolia.
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
