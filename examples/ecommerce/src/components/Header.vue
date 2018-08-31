<template>
  <header class="navbar">
    <img src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png" width="40">
    <h1 class="navbar__title">aeki</h1>
    <slot />
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.navbar {
  background-color: #222f3f;
  display: flex;
  align-items: center;
  padding: 10px;
}

.navbar__title {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  margin: 0 15px;
}
</style>
