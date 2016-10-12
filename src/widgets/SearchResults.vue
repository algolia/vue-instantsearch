<template>
    <div class="search-results">

        <component v-for="hit in hits" :is="hitComponent" :hit="hit"></component>

        <template v-if="hits.length === 0">
            <slot name="no-results">
                <div class="search-results__no-results">No results found for query "{{query}}"</div>
            </slot>
        </template>
    </div>
</template>

<script>
    import widget from '../mixins/widget'
    import SearchResult from './SearchResult.vue'

    export default {
        mixins: [widget],
        props: {
            hitComponent: {
                required: false,
                default: function () {
                    return this.$options.components.SearchResult
                }
            }
        },
        filters: {
            highlight: function (hit, attribute) {
                return hit._highlightResult[attribute].value
            }
        },
        computed: {
            hits: function () {
                return this.store.hits
            },
            query: function () {
                return this.store.query
            }
        },
        components: {
            SearchResult
        }
    }
</script>
