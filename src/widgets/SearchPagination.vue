<template>
    <div class="search-pagination" v-if="nbPages > 1">
        <slot name="first-page">
            <span class="search-pagination__item search-pagination__item--first" @click="first()" v-if="!isFirst">&lt;&lt;</span>
        </slot>
        <slot name="previous-page">
            <span class="search-pagination__item search-pagination__item--previous" @click="previous()" v-if="!isFirst">&lt;</span>
        </slot>
        <span class="search-pagination__item" v-for="p in pages" @click="setPage(p)"
              :class="{'search-pagination__item--active': p === page}">{{ p + 1 }}</span>
        <slot name="next-page">
            <span class="search-pagination__item search-pagination__item--next" @click="next()"
                  v-if="!isLast">&gt;</span>
        </slot>
        <slot name="last-page">
            <span class="search-pagination__item search-pagination__item--last" @click="last()"
                  v-if="!isLast">&gt;&gt;</span>
        </slot>
    </div>
</template>

<script>
    import widget from '../mixins/widget'

    export default {
        mixins: [widget],
        props: {
            padding: {
                type: Number,
                default: 3
            }
        },
        computed: {
            page: function () {
                return this.store.page
            },
            nbPages: function () {
                return this.store.nbPages
            },
            pages: function () {
                let maxPages = this.padding * 2
                if (this.nbPages - 1 < maxPages) {
                    maxPages = this.nbPages - 1
                }

                let pages = [this.page]
                let even = false
                let lastPage = this.page
                let firstPage = this.page
                while (pages.length <= maxPages) {
                    even = !even
                    if (even) {
                        if (firstPage <= 0) {
                            continue
                        }
                        firstPage--
                        pages.unshift(firstPage)
                    } else {
                        if (lastPage >= this.nbPages - 1) {
                            continue
                        }
                        lastPage++
                        pages.push(lastPage)
                    }
                }

                return pages
            },
            isFirst: function () {
                return this.page === 0
            },
            isLast: function () {
                if (this.nbPages === 0) return true

                return this.page === this.nbPages - 1
            }
        },
        methods: {
            first: function () {
                this.store.firstPage()
            },
            previous: function () {
                this.store.previousPage()
            },
            setPage: function (page) {
                this.store.page = page
            },
            next: function () {
                this.store.nextPage()
            },
            last: function () {
                this.store.lastPage()
            }
        }
    }
</script>

<style scoped>
    .search-pagination__item--active {
        font-weight: bold;
    }
</style>
