<template>
  <div v-if="state" :class="suit()">
    <slot>
      <button
        type="button"
        :class="suit('button')"
        :title="isBrowserSupported ? buttonTitle : disabledButtonTitle"
        :disabled="!isBrowserSupported"
        @click="handleClick"
      >
        <slot name="buttonText" v-bind="innerSlotProps">
          <svg v-bind="buttonSvgAttrs" v-if="errorNotAllowed">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
          <svg v-bind="buttonSvgAttrs" v-else>
            <path
              d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
              :fill="isListening ? 'currentColor' : 'none'"
            ></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </slot>
      </button>
      <div :class="suit('status')">
        <slot name="status" v-bind="innerSlotProps">
          <p>{{transcript}}</p>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
import connectVoiceSearch from './tmp/connectVoiceSearch';
import { createSuitMixin } from '../mixins/suit';
import { createWidgetMixin } from '../mixins/widget';

export default {
  name: 'AisVoiceSearch',
  mixins: [
    createWidgetMixin({ connector: connectVoiceSearch }),
    createSuitMixin({ name: 'VoiceSearch' }),
  ],
  props: {
    searchAsYouSpeak: {
      type: Boolean,
      required: false,
      default: false,
    },
    buttonTitle: {
      type: String,
      required: false,
      default: 'Search by voice',
    },
    disabledButtonTitle: {
      type: String,
      required: false,
      default: 'Search by voice (not supported on this browser)',
    },
  },
  data() {
    return {
      buttonSvgAttrs: {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '16',
        height: '16',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    };
  },
  computed: {
    widgetParams() {
      return {
        searchAsYouSpeak: this.searchAsYouSpeak,
      };
    },
    status() {
      return this.state.voiceListeningState.status;
    },
    transcript() {
      return this.state.voiceListeningState.transcript;
    },
    isSpeechFinal() {
      return this.state.voiceListeningState.isSpeechFinal;
    },
    errorCode() {
      return this.state.voiceListeningState.errorCode;
    },
    isBrowserSupported() {
      return this.state.isBrowserSupported;
    },
    isListening() {
      return this.state.isListening;
    },
    errorNotAllowed() {
      return this.status === 'error' && this.errorCode === 'not-allowed';
    },
    innerSlotProps() {
      return {
        status: this.status,
        errorCode: this.errorCode,
        isListening: this.isListening,
        transcript: this.transcript,
        isSpeechFinal: this.isSpeechFinal,
        isBrowserSupported: this.isBrowserSupported,
      };
    },
  },
  methods: {
    toggleListening() {
      this.state.toggleListening();
    },
    handleClick(event) {
      event.currentTarget.blur();
      this.toggleListening();
    },
  },
};
</script>
