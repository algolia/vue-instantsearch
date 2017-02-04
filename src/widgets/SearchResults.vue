<template>
    <transition-group class="search-results" name="search-results-transition" tag="div">
        <slot v-for="hit in hits" :hit="hit">
            <search-result :hit="hit" :key="hit.objectID"></search-result>
        </slot>
    </transition-group>
</template>

<script>
    import widget from '../mixins/widget'
    import SearchResult from '../widgets/SearchResult.vue'

    export default {
        mixins: [widget],
        computed: {
            hits: function () {
                return this.store.hits
            },
            query: function () {
                return this.store.query
            }
        },
        methods: {
            highlight: function (hit, attribute) {
                if (typeof hit._highlightResult[attribute] === 'undefined') {
                    util.warn('Attribute `' + attribute + '` has no highlight.', this)
                }
                return hit._highlightResult[attribute].value
            },
            snippet: function (attribute) {
                if (typeof hit._snippetResult[attribute] === 'undefined') {
                    util.warn('Attribute `' + attribute + '` has no snippet.', this)
                }
                return hit._snippetResult[attribute].value
            }
        },
        components: {
            SearchResult
        }
    }
</script>
