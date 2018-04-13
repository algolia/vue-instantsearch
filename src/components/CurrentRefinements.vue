<template>
<pre>{{JSON.stringify(currentRefinedValues, null, 2)}}</pre>
</template>

<script>
import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  data() {
    return {
      blockClassName: 'ais-current-refinements',
    };
  },
  computed: {
    currentRefinedValues() {
      console.log(this.searchStore._helper.getRefinements());
      return this.searchStore._helper.getRefinements();
    },
  },
  methods: {
    clear(attribute) {
      this.searchStore.clearRefinements(attribute);
      this.searchStore.refresh();
    },
  },
};
</script>
