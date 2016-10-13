<template>
    <div class="price-range">

        <slot name="header"></slot>

        <span class="price-range__currency price-range__currency--left" v-if="currencyPlacement === 'left'">{{currency}}</span>
        <input class="price-range__input price-range__input--from" type="number" v-model="from" @change="updateFrom" placeholder="min">
        <span class="price-range__currency price-range__currency--right" v-if="currencyPlacement === 'right'">{{currency}}</span>

        <slot>to</slot>

        <span class="price-range__currency price-range__currency--left" v-if="currencyPlacement === 'left'">{{currency}}</span>
        <input class="price-range__input price-range__input--to" type="number" v-model="to" @change="updateTo" placeholder="max">
        <span class="price-range__currency price-range__currency--right" v-if="currencyPlacement === 'right'">{{currency}}</span>

        <slot name="footer"></slot>

    </div>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        props: {
            attribute: {
                type: String,
                required: true
            },
            currency: {
                type: String,
                required: false,
                default: '$'
            },
            currencyPlacement: {
                type: String,
                required: false,
                default: 'left',
                validator: function (value) {
                    return value === 'left' || value === 'right'
                }
            }
        },
        computed: {
            from: function() {
                for(let refinement of this.store.activeRefinements) {
                    if(refinement.attributeName === this.attribute && refinement.type === 'numeric' && refinement.operator === '>') {
                        return refinement.numericValue
                    }
                }
                return
            },
            to: function() {
                for(let refinement of this.store.activeRefinements) {
                    if(refinement.attributeName === this.attribute && refinement.type === 'numeric' && refinement.operator === '<') {
                        return refinement.numericValue
                    }
                }
                return
            }
        },
        methods: {
            updateFrom: function(event) {
                const value = Number(event.target.value)
                this.store.stop()
                this.store.removeNumericRefinement(this.attribute, '>')
                if(value > 0) {
                    this.store.addNumericRefinement(this.attribute, '>', value)
                }
                this.store.start()
            },
            updateTo: function(event) {
                const value = Number(event.target.value)

                // Only update when `to` has reached the `from` value.
                if(value < Number(this.from)) {
                    return
                }

                this.store.stop()
                this.store.removeNumericRefinement(this.attribute, '<')
                if(value > 0) {
                    this.store.addNumericRefinement(this.attribute, '<', value)
                }
                this.store.start()
            }
        }
    }
</script>

<style scoped>
    .price-range__input {
        width: 50px
    }
</style>
