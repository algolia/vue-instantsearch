<template>
    <div class="empty-search-results" v-if="hits.length === 0">
        <slot>
            No results matched your query <span class="empty-search-results__query">{{query}}</span>
        </slot>
    </div>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        computed: {
            hits: function () {
                return this.store.hits
            },
            query: function () {
                return this.store.query
            }
        }
    }
</script>

<style scoped>
    .empty-search-results__query {
        font-weight: bold;
    }
</style>
