<template>
    <input type="text"
           autocorrect="off"
           autocapitalize="off"
           spellcheck="false"

           @input="onInput"

           :value="query"
           :placeholder="placeholder">
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        props: {
            placeholder: {
                type: String,
                required: false
            }
        },
        computed: {
            query: function () {
                return this.store.query
            }
        },
        methods: {
            onInput: function (e) {
                this.store.query = e.target.value
            }
        }
    }
</script>
