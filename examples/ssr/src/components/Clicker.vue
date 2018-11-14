<template>
  <button @click="toggle">{{toggled ? '' : 'not'}} toggled</button>
</template>

<script>
export default {
  data() {
    return {
      toggled: false
    }
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled
    }
  }
}
</script>

