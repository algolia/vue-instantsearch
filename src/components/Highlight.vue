<template>
  <span
    :class="suit()"
    v-html="innerHTML"
  />
</template>

<script>
import { createSuitMixin } from '../mixins/suit';
import { getPropertyByPath } from '../util/object';
import { warn } from '../util/warn';

// not imported from instantsearch.js/es/lib/escape-highlight,
// because that path can change adn break our implementation
const TAG_REPLACEMENT = {
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
};

export default {
  name: 'AisHighlight',
  mixins: [createSuitMixin({ name: 'Highlight' })],
  props: {
    hit: {
      type: Object,
      required: true,
    },
    attribute: {
      type: String,
      required: true,
    },
    highlightedTagName: {
      type: String,
      default: 'mark',
    },
  },
  computed: {
    innerHTML() {
      const attributeValue =
        getPropertyByPath(
          this.hit,
          `_highlightResult.${this.attribute}.value`
        ) || '';

      if (process.env.NODE_ENV !== 'production' && attributeValue === '') {
        warn(
          `The "${
            this.attribute
          }" attribute might currently not be configured to be highlighted in Algolia.` +
            'See https://www.algolia.com/doc/api-reference/api-parameters/attributesToHighlight/.'
        );
      }

      return attributeValue
        .replace(
          new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'),
          `<${this.highlightedTagName} class="${this.suit('highlighted')}">`
        )
        .replace(
          new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'),
          `</${this.highlightedTagName}>`
        );
    },
  },
};
</script>
