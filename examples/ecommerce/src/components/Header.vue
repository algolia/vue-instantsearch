<template>
  <header class="navbar">
    <img src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png" width="40">
    <h1 class="navbar__title">aeki</h1>
    <ais-search-box placeholder="Search a product" />
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

/*
 * SearchBox
 */

header .ais-SearchBox-form {
  display: flex;
}

header .ais-SearchBox-input {
  width: 275px;
  padding: 5px 12px;
  border: 1px solid transparent;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-family: Verdana, sans-serif;
  font-size: 14px;
}

header .ais-SearchBox-input:focus {
  border-color: #ffbe61;
  outline: none;
}

header .ais-SearchBox-submit {
  background-color: #ffbe61;
  padding: 0 30px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: none;
}

header .ais-SearchBox-submitIcon {
  width: 15px;
  height: 15px;
}

header .ais-SearchBox-reset {
  display: none;
}
</style>
