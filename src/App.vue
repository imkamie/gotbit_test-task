<script>
import NavbarItem from "./components/NavbarItem.vue";
import StakingApp from "./components/StakingApp.vue";
import FooterItem from "./components/FooterItem.vue";

export default {
  name: "App",
  components: {
    FooterItem,
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
  <footer>
    <FooterItem />
  </footer>
</template>

<style>
@import "./assets/base.css";
.main {
  max-width: 1170px;
  margin: 0 auto;
}
</style>
