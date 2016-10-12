<template>
    <div class="menu-facet" v-if="facetValues.length > 0">
        <slot name="header"></slot>

        <div v-for="facet in facetValues" class="menu-facet__item"
             :class="{'menu-facet__item--active': facet.isRefined}" @click="toggleRefinement(facet)">
            <span class="menu-facet__item__value">{{facet.name}}</span> <span class="menu-facet__item__count">{{facet.count | formatNumber}}</span>
        </div>

        <slot name="footer"></slot>
    </div>
</template>

<script>
    import widget from '../mixins/widget'
    import {FACET_DISJUNCTIVE} from '../store'

    export default {
        mixins: [widget],
        props: {
            attribute: {
                type: String,
                required: true
            },
            limit: {
                type: Number,
                default: 10
            },
            sortBy: {
                default: function () {
                    return ['isRefined:desc', 'count:desc', 'name:asc']
                }
            }
        },
        mounted: function () {
            this.store.addFacet(this.attribute, FACET_DISJUNCTIVE)
        },
        destroyed: function () {
            this.store.removeFacet(this.attribute)
        },
        computed: {
            facetValues: function () {
                // Todo: We should probably enforce 'isRefined:desc' when an active refinement is there.
                // Todo: Problem being we don't know if it's active until we filter the values after retrieval.
                // Todo: We can override the sortBy if isRefined, and we can extract that from searchResults.getRefinements().
                const facets = this.store.getFacetValues(this.attribute, this.sortBy, this.limit)

                const active = facets.filter(facet => facet.isRefined)

                if (active.length > 0) {
                    return active
                }

                return facets
            }
        },
        methods: {
            toggleRefinement: function (facet) {
                this.store.toggleFacetRefinement(this.attribute, facet.name)
            }
        }
    }
</script>

<style scoped>
    .menu-facet__item--active {
        font-weight: bold;
    }
</style>
