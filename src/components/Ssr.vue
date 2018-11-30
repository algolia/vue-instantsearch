<template>
  <!-- AisSsr is an empty component that will hold other widgets -->
  <div :class="suit()"><slot /></div>
</template>

<script>
import { createInstantSearch } from '../util/createInstantSearch';

export default createInstantSearch({ ssr: true });
</script>
