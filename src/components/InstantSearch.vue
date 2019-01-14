<template>
  <!-- AisInstantSearch is an empty component that will hold other widgets -->
  <div :class="suit()"><slot /></div>
</template>

<script>
import { createInstantSearchComponent } from '../util/createInstantSearchComponent';

export default createInstantSearchComponent({ ssr: false });
</script>
