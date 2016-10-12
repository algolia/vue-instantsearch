<template>
    <div class="list-facet" v-if="facetValues.length > 0">
        <slot name="header"></slot>

        <div v-for="facet in facetValues" class="list-facet__item"
             :class="{'list-facet__item--active': facet.isRefined}" @click="toggleRefinement(facet)">
            <span class="list-facet__item__value">{{facet.name}}</span> <span class="list-facet__item__count">{{facet.count | formatNumber}}</span>
        </div>

        <slot name="footer"></slot>
    </div>
</template>

<script>
    import widget from '../mixins/widget'
    import {FACET_CONJUNCTIVE, FACET_DISJUNCTIVE} from '../store'

    export default {
        mixins: [widget],
        props: {
            attribute: {
                type: String,
                required: true
            },
            operator: {
                type: String,
                required: false,
                validator: function (value) {
                    return value === 'and' || value === 'or'
                },
                default: 'or'
            },
            limit: {
                type: Number,
                default: 10
            },
            sortBy: {
                default: function () {
                    return ['isRefined:desc', 'count:desc', 'name:asc']
                }
            },
            multi: {
                type: Boolean,
                default: true
            }
        },
        mounted: function () {
            const facetType = this.operator === 'and' ? FACET_CONJUNCTIVE : FACET_DISJUNCTIVE
            this.store.addFacet(this.attribute, facetType)
        },
        destroyed: function () {
            this.store.removeFacet(this.attribute)
        },
        computed: {
            facetValues: function () {
                return this.store.getFacetValues(this.attribute, this.sortBy, this.limit)
            }
        },
        methods: {
            toggleRefinement: function (value) {
                if (value.isRefined || this.multi) {
                    return this.store.toggleFacetRefinement(this.attribute, value.name)
                }

                this.store.stop()
                this.store.clearRefinements(this.attribute)
                this.store.toggleFacetRefinement(this.attribute, value.name)
                this.store.start()
            }
        },
        watch: {
            operator: function (value) {
                const facetType = value === 'and' ? FACET_CONJUNCTIVE : FACET_DISJUNCTIVE
                this.store.addFacet(this.attribute, facetType)
            }
        }
    }
</script>

<style scoped>
    .list-facet__item--active {
        font-weight: bold;
    }
</style>
