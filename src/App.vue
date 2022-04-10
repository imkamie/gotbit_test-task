<script>
import NavbarItem from "./components/NavbarItem.vue";
import StakingApp from "./components/StakingApp.vue";

export default {
  name: "App",
  components: {
    StakingApp,
    NavbarItem,
  },
};
</script>

<template>
  <header>
    <NavbarItem />
  </header>
  <main class="main">
    <StakingApp />
  </main>
</template>

<style>
@import "./assets/base.css";
.main {
  max-width: 1170px;
  margin: 0 auto;
}
</style>
