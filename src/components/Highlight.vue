<template>
  <highlighter
    :hit="hit"
    :attribute="attribute"
    :highlighted-tag-name="highlightedTagName"
    :suit="suit"
    highlight-property="_highlightResult"
    pre-tag="<mark>"
    post-tag="</mark>"
  />
</template>

<script>
import { createSuitMixin } from '../mixins/suit';
import Highlighter from './Highlighter.vue';

export default {
  name: 'AisHighlight',
  mixins: [createSuitMixin({ name: 'Highlight' })],
  components: { Highlighter },
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
};
</script>
