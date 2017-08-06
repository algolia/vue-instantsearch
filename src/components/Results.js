import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  props: {
    stack: {
      type: Boolean,
      default: false,
    },
    resultsPerPage: {
      type: Number,
    },
    tagName: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      blockClassName: 'ais-results',
    };
  },
  render(h) {
    if (!this.show) {
      return undefined;
    }

    const children = [];
    if (this.$slots.header) {
      children.push(this.$slots.header);
    }

    this.results.forEach(result => {
      if (this.$scopedSlots.default) {
        children.push(this.$scopedSlots.default({ result }));
      } else {
        children.push(h('div', `'objectID': ${result.objectID}`));
      }
    });

    if (this.$slots.footer) {
      children.push(this.$slots.footer);
    }

    return h(this.tagName, { class: this.bem() }, children);
  },
  mounted() {
    this.updateResultsPerPage();
  },
  watch: {
    resultsPerPage() {
      this.updateResultsPerPage();
    },
  },
  methods: {
    updateResultsPerPage() {
      if (typeof this.resultsPerPage === 'number' && this.resultsPerPage > 0) {
        this.searchStore.resultsPerPage = this.resultsPerPage;
      }
    },
  },
  computed: {
    results() {
      if (this.stack === false) {
        return this.searchStore.results;
      }

      if (typeof this.stackedResults === 'undefined') {
        this.stackedResults = [];
      }

      if (this.searchStore.page === 1) {
        this.stackedResults = [];
      }

      if (
        this.stackedResults.length === 0 ||
        this.searchStore.results.length === 0
      ) {
        this.stackedResults.push(...this.searchStore.results);
      } else {
        const lastStacked = this.stackedResults[this.stackedResults.length - 1];
        const lastResult = this.searchStore.results[
          this.searchStore.results.length - 1
        ];

        if (lastStacked.objectID !== lastResult.objectID) {
          this.stackedResults.push(...this.searchStore.results);
        }
      }

      return this.stackedResults;
    },
    show() {
      return this.results.length > 0;
    },
  },
};
