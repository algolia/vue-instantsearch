<template>
  <div
    :class='suit()'
    v-if="loaded"
  >
    <slot />
  </div>
</template>

<script>
import suit from '../src/mixins/suit';

export default {
  props: {
    scripts: {
      type: Array,
      default: () => [],
    },
    styles: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [suit],
  data() {
    const styles = this.styles.map(href => ({
      type: 'style',
      href,
      loaded: false,
    }));
    const scripts = this.scripts.map(src => ({
      type: 'script',
      src,
      loaded: false,
    }));
    return {
      allTags: [].concat(styles).concat(scripts),
      widgetName: 'ScriptLoader',
    };
  },
  created() {
    this.allTags.forEach(tag => {
      let t;
      if (tag.type === 'script') {
        t = document.createElement('script');
        t.setAttribute('src', tag.src);
      } else {
        t = document.createElement('link');
        t.setAttribute('href', tag.href);
        t.setAttribute('rel', 'stylesheet');
      }
      // eslint-disable-next-line no-param-reassign
      t.addEventListener('load', () => (tag.loaded = true));
      document.head.appendChild(t);
    });
  },
  computed: {
    loaded() {
      return this.allTags.every(({ loaded }) => loaded);
    },
  },
};
</script>
