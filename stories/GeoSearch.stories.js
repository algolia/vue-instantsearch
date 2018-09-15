import { previewWrapper } from './utils';
import { storiesOf } from '@storybook/vue';
import VMapbox from 'mapbox-gl-vue';
import ScriptLoader from './ScriptLoader.vue';

storiesOf('GeoSearch', module)
  .addDecorator(
    previewWrapper({
      indexName: 'airbnb',
      hits: `
      <ol
        slot-scope="{ items }"
        class="playground-hits"
      >
        <li
          v-for="item in items"
          :key="item.objectID"
          class="playground-hits-item"
        >
          <div
            class="playground-hits-image"
            :style="{ backgroundImage: 'url(' + item.thumbnail_url + ')' }"
          />
          <div class="playground-hits-desc">
            <p>
              <ais-highlight attribute="name" :hit="item" />
            </p>
            <p>Type: {{ item.room_type }}</p>
            <p>Price: {{ item.price }}$</p>
          </div>
        </li>
      </ol>
      `,
      filters: `<ais-refinement-list attribute="property_type" />`,
    })
  )
  .add('simple usage', () => ({
    template: `<ais-geo-search />`,
  }))
  .add('no refine on map move', () => ({
    template: `
      <ais-geo-search
        :enable-refine-on-map-move="false" 
      />
    `,
  }))
  .add('custom rendering (list)', () => ({
    template: `
      <ais-geo-search>
        <template slot-scope="{ items }">
          <div
            v-for="item in items"
            :key="item.objectID"
          >
            {{item.name}}
            <pre>{{item._geoloc}}</pre>
          </div>
        </template>
      </ais-geo-search>
    `,
  }))
  .add('custom rendering (mapbox)', () => ({
    components: { VMapbox, ScriptLoader },
    template: `
      <script-loader
        :scripts="['https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js']"
        :styles="['https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css']"
      >
        <ais-geo-search>
          <template slot-scope="{ items }">
            <v-mapbox
              @map-load="mapLoaded"
              access-token="pk.eyJ1IjoiaGFyb2VudiIsImEiOiJjam0yb3YxZ2wxaGZhM2tydjgxbzBsZWw3In0.gUTRSuh44JKza3fosDpDnQ"
              :map-options="{
                style: 'mapbox://styles/mapbox/streets-v10',
                center: [-122.420679, 37.772537],
                zoom: 10,
              }"
            />
          </template>
        </ais-geo-search>
      </script-loader>
      `,
    methods: {
      mapLoaded(map) {
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-77.03238901390978, 38.913188059745586],
                  },
                  properties: {
                    title: 'Mapbox DC',
                    icon: 'monument',
                  },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776],
                  },
                  properties: {
                    title: 'Mapbox SF',
                    icon: 'harbor',
                  },
                },
              ],
            },
          },
          layout: {
            'icon-image': '{icon}-15',
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
          },
        });
      },
    },
  }));
