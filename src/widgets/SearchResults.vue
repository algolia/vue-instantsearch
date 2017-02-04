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
        props: {
            stack: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            hits: function () {
                if(this.stack === false) {
                    return this.store.hits
                }

                if(typeof this.stackedHits === 'undefined') {
                    this.stackedHits = []
                }

                if(this.store.page === 0) {
                    this.stackedHits = []
                }

                this.stackedHits.push(...this.store.hits)

                return this.stackedHits
            }
        },
        components: {
            SearchResult
        }
    }
</script>
