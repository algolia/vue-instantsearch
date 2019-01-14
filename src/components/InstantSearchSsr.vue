<template>
  <!-- AisSsr is an empty component that will hold other widgets -->
  <div :class="[suit(), suit('', 'ssr')]"><slot /></div>
</template>

<script>
import { createInstantSearchComponent } from '../util/createInstantSearchComponent';

export default createInstantSearchComponent({ ssr: true });
</script>
