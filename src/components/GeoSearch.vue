<template>
  <div
    :class="suit()"
    v-if="state"
  >
    <slot
      :position="state.position"
      :items="state.items"
      :refine="state.refine"
      :clear-map-refinement="state.clearMapRefinement"
      :is-refined-with-map="isRefinedWithMap"
      :toggle-refine-on-map-move="state.toggleRefineOnMapMove"
      :is-refine-on-map-move="isRefineOnMapMove"
      :set-map-move-since-last-refine="state.setMapMoveSinceLastRefine"
      :has-map-moved-since-last-refine="isRefineOnMapMove"
    >
      <json-tree
        :data="state"
        :level="2"
      />
      <p>position: <code>{{ state.position }}</code></p>
      <p>items: <code>{{ state.items }}</code></p>
      <p>refine: <code>{{ state.refine }}</code></p>
      <p>clearMapRefinement: <code>{{ typeof state.clearMapRefinement }}</code></p>
      <p>isRefinedWithMap: <code>{{ isRefinedWithMap }}</code></p>
      <p>toggleRefineOnMapMove: <code>{{ typeof state.toggleRefineOnMapMove }}</code></p>
      <p>isRefineOnMapMove: <code>{{ isRefineOnMapMove }}</code></p>
      <p>setMapMoveSinceLastRefine: <code>{{ typeof state.setMapMoveSinceLastRefine }}</code></p>
      <p>hasMapMovedSinceLastRefine: <code>{{ hasMapMovedSinceLastRefine }}</code></p>
      <p>widgetParams: <code>{{ state.widgetParams }}</code></p>
    </slot>
  </div>
</template>

<script>
import JsonTree from 'vue-json-tree'; // 👈 When done, remove this
import algoliaComponent from '../mixins/component';
import { connectGeoSearch } from 'instantsearch.js/es/connectors';

export default {
  // ⬇️ this is to help you debugging what's in `state`
  // remove it before pushing the component
  components: { 'json-tree': JsonTree },
  mixins: [algoliaComponent],
  props: {
    enableRefineOnMapMove: {
      required: false,
      type: Boolean,
      default: true,
    },
    enableGeolocationWithIP: {
      required: false,
      type: Boolean,
      default: true,
    },
    position: {
      required: false,
      type: Object,
      validator(value) {
        return typeof value.lat === 'number' && typeof value.lon === 'number';
      },
      default: undefined,
    },
    radius: {
      required: false,
      type: Number,
      default: undefined,
    },
    precision: {
      required: false,
      type: Number,
      default: undefined,
    },
    transformItems: {
      required: false,
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      widgetName: 'GeoSearch',
    };
  },
  beforeCreate() {
    this.connector = connectGeoSearch;
  },
  computed: {
    widgetParams() {
      return {
        enableRefineOnMapMove: this.enableRefineOnMapMove,
        enableGeolocationWithIP: this.enableGeolocationWithIP,
        position: this.position,
        radius: this.radius,
        precision: this.precision,
        transformItems: this.transformItems,
      };
    },
    hasMapMovedSinceLastRefine() {
      return this.state.hasMapMoveSinceLastRefine();
    },
    isRefineOnMapMove() {
      return this.state.isRefineOnMapMove();
    },
    isRefinedWithMap() {
      return this.state.isRefinedWithMap();
    },
  },
};
</script>
