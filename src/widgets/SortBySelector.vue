<template>
    <select class="sort-by-selector" @change="changeIndex" v-model="indexName">
        <option v-for="index in indices" :value="index.name">
            {{index.label}}
        </option>
    </select>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        props: {
            indices: {
                type: Array,
                required: true
            },
        },
        computed: {
            indexName: function () {
                return this.store.index
            }
        },
        mounted: function () {
            let match = false
            for (let index of this.indices) {
                if (index.name === this.indexName) {
                    match = true
                }
            }

            if (!match) {
                this.store.index = this.indices[0].name
            }
        },
        methods: {
            changeIndex: function (event) {
                this.store.index = event.target.value
            }
        }
    }
</script>
