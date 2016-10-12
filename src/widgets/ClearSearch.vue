<template>
    <div class="clear-search" @click="clearRefinements" v-if="isRefined">
        <slot>&times;</slot>
    </div>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        props: {
            clearQuery: {
                type: Boolean,
                required: false,
                default: true
            },
            clearFacets: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {
            isRefined: function () {
                if (this.clearQuery && this.store.query.length > 0) {
                    return true
                }

                if (this.clearFacets && this.store.activeRefinements.length > 0) {
                    return true
                }

                return false
            }
        },
        methods: {
            clearRefinements: function () {
                this.store.stop()
                if (this.clearQuery && this.store.query.length > 0) {
                    this.store.query = ''
                }

                if (this.clearFacets && this.store.activeRefinements.length > 0) {
                    this.store.clearRefinements()
                }
                this.store.start()
            }
        }
    }
</script>
