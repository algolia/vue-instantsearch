<template>
    <div class="search-stats" v-if="nbHits > 0">
        <slot>{{nbHits | formatNumber}} results found in {{processingTimeMS}}ms</slot>
    </div>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        computed: {
            nbHits: function () {
                return this.store.nbHits
            },
            processingTimeMS: function () {
                return this.store.processingTimeMS
            }
        }
    }
</script>
