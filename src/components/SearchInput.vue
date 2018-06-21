<template>
  <div :class="suit()">
    <form
      action=""
      role="search"
      novalidate
      :class="suit('form')"
      @submit.prevent="onFormSubmit"
      @reset.prevent="onFormReset"
    >
      <input
        type="search"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        required
        maxlength="512"
        aria-label="Search"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :class="suit('input')"
        v-model="query"
      >

      <button
        type="submit"
        :title="submitTitle"
        :class="suit('submit')"
        :hidden="showLoadingIndicator && shouldShowLoadingIndicator"
      >
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 40 40"
          :class="suit('submitIcon')"
        >
          <path
            d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
            fillRule="evenodd"
          />
        </svg>
      </button>

      <button
        type="reset"
        :title="clearTitle"
        :class="suit('reset')"
      >
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          :class="suit('resetIcon')"
        >
          <path
            d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
            fillRule="evenodd"
          />
        </svg>
      </button>

      <span
        v-if="shouldShowLoadingIndicator"
        :hidden="!shouldShowLoadingIndicator"
        :class="suit('loadingIndicator')"
      >
        <slot name="loading-indicator">
          <svg
            role="img"
            aria-label="Results are loading"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#444"
            viewBox="0 0 38 38"
            :class="suit('loadingIcon')"
          >
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </slot>
      </span>
    </form>
  </div>
</template>

<script>
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import algoliaComponent from '../component';

export default {
  mixins: [algoliaComponent],
  props: {
    placeholder: {
      type: String,
      default: 'Search here…',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    showLoadingIndicator: {
      type: Boolean,
      default: false,
    },
    shouldShowLoadingIndicator: {
      type: boolean,
      default: false,
    },
    submitTitle: {
      type: String,
      default: 'Search',
    },
    clearTitle: {
      type: String,
      default: 'Clear',
    },
    refine: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      widgetName: 'SearchBox',
    };
  },
  methods: {
    onFormSubmit() {
      const input = this.$el.querySelector('input[type=search]');
      input.blur();
    },
    onFormReset() {
      this.refine('');
    },
  },
  computed: {
    query: {
      get() {
        return this.state.query;
      },
      set(value) {
        this.refine(value);
      },
    },
  },
};</script>