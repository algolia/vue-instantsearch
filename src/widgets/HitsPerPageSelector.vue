<template>
    <select class="hpp-selector" @change="changeHitsPerPage" v-model="hitsPerPage">
        <option v-for="option in options" :value="option">
            <span>{{option}}</span> <span>per page</span>
        </option>
    </select>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        props: {
            options: {
                type: Array,
                default: function () {
                    return [6, 12, 24]
                }
            },
        },
        computed: {
            hitsPerPage: function () {
                return this.store.hitsPerPage
            }
        },
        mounted: function () {
            if (this.options.indexOf(this.store.hitsPerPage) === -1) {
                this.store.hitsPerPage = this.options[0]
            }
        },
        watch: function () {
            this.store.hitsPerPage
        },
        methods: {
            changeHitsPerPage: function (event) {
                this.store.hitsPerPage = Number(event.target.value)
            }
        }
    }
</script>
