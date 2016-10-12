<template>
    <div class="search-result" :key="hit.objectID">
        <div v-for="(attribute, key) in hit">{{key}}: {{attribute}}</div>
    </div>
</template>

<script>
    import {util} from 'vue'

    export default {
        props: {
            hit: {
                type: Object,
                required: true
            }
        },
        methods: {
            highlight: function (attribute) {
                if (typeof this.hit._highlightResult[attribute] === 'undefined') {
                    util.warn('Attribute `' + attribute + '` has no highlight.', this)
                }
                return this.hit._highlightResult[attribute].value
            },
            snippet: function (attribute) {
                if (typeof this.hit._snippetResult[attribute] === 'undefined') {
                    util.warn('Attribute `' + attribute + '` has no snippet.', this)
                }
                return this.hit._snippetResult[attribute].value
            }
        }
    }
</script>
