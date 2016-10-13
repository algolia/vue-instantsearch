<template>
    <transition-group class="search-results" name="search-results-transition" tag="div">
        <component v-for="hit in hits" :is="hitComponent" :hit="hit" :key="hit.objectID"></component>
    </transition-group>
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
