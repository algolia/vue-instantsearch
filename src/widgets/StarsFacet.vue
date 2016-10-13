<template>
    <div class="stars-facet" v-if="isVisible">
        <slot name="header"></slot>

        <div v-for="facet in facetValues" class="stars-facet__item"
             :class="{'stars-facet__item--active': facet.isRefined}" @click="toggleRefinement(facet)">
            <template v-for="n in max">
                <span v-if="n <= facet.name" class="stars-facet__star"></span>
                <span v-else class="stars-facet__star--empty"></span>
            </template>
            &amp; up <span class="stars-facet__item__count">({{facet.count | formatNumber}})</span>
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
            min: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: 5
            }
        },
        mounted: function () {
            this.store.addFacet(this.attribute, FACET_DISJUNCTIVE)
        },
        destroyed: function () {
            this.store.removeFacet(this.attribute)
        },
        computed: {
            isVisible: function () {
                for (let value of this.facetValues) {
                    if (value.count > 0) {
                        return true
                    }
                }
                return false
            },
            facetValues: function () {
                const values = this.store.getFacetValues(this.attribute, ['name:asc'], this.max + 1)

                let stars = []
                let isRefined = false

                for (let i = 0; i <= this.max; i++) {
                    let name = i.toString()
                    let star = {
                        count: 0,
                        isRefined: false,
                        name: name,
                        value: i
                    }

                    for (let value of values) {
                        if (value.name === name) {
                            if (!isRefined && value.isRefined) {
                                isRefined = true
                                star.isRefined = true
                            }
                        }
                    }

                    stars.push(star)
                }

                stars = stars.reverse()

                let count = 0
                for (let index in stars) {
                    stars[index].count = count
                    for (let value of values) {
                        if (value.name === stars[index].name) {
                            count += value.count
                            stars[index].count = count
                        }
                    }
                }

                return stars.slice(this.min, this.max)
            }
        },
        methods: {
            toggleRefinement: function (facet) {
                if (facet.isRefined) {
                    return this.store.clearRefinements(this.attribute)
                }

                if (facet.count === 0) {
                    return
                }

                this.store.stop()
                this.store.clearRefinements(this.attribute)
                for (let val = Number(facet.name); val <= this.max; ++val) {
                    this.store.addFacetRefinement(this.attribute, val);
                }
                this.store.start()
            }
        }
    }
</script>

<style scoped>
    .stars-facet__item--active {
        font-weight: bold;
    }

    .stars-facet__star {
        width: 1em;
        height: 1em;
    }

    .stars-facet__star:before {
        content: '\2605';
        color: #FBAE00;
    }

    .stars-facet__star--empty:before {
        content: '\2606';
        color: #FBAE00;
    }
</style>
