<template>
  <div class="navbar">
    <div class="navbar-container">
      <div class="navbar-item staking">Staking</div>
      <div class="navbar-item">Bridge</div>
      <div class="navbar-item">SHO</div>
      <div v-if="!IS_CONNECTED" class="navbar-item btn-wrapper">
        <button-item
          :white="true"
          text="Connect wallet"
          @click="showModal"
        ></button-item>
      </div>
      <div v-else class="navbar-item user-info">
        <div class="user-address">{{USER_ADDRESS}}</div>
        <div class="user-balance"></div>
      </div>
    </div>
  </div>
  <SelectPayment v-if="isVisible" @closePopup="closeModal" />
</template>

<script>
import ButtonItem from "./ButtonItem.vue";
import SelectPayment from "./SelectPayment.vue";
import { mapGetters } from "vuex";

export default {
  name: "NavbarItem",
  components: {
    ButtonItem,
    SelectPayment,
  },
  computed: {
    ...mapGetters(["IS_CONNECTED", "USER_ADDRESS"]),
    userAddress() {
      return this.$store.getters.userAddress;
    },
    // userBalance() {
    //   return this.$store.getters.balance;
    // },
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
    showModal() {
      this.isVisible = true;
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },



  mounted() {
    this.$store.dispatch("SET_USER_ADDRESS").then(
      () => {
        console.log("Got some data, now lets show something in this component");
        // TODO: stop the ajax spinner, loading is done at this point.
      },
      () => {
        console.error(
          "Got nothing from server. Prompt user to check internet connection and try again"
        );
      }
    );
  },
};
</script>

<style scoped>
.navbar {
  padding: 20px 0 14px;
  border-bottom: #ffffff solid 1px;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.2875px;
}

.navbar-container {
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-left: 30px;
}

.navbar-item {
  margin-left: 30px;
}

.btn-wrapper {
  width: 164px;
  height: 48px;
}

.staking {
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.2875px;
  color: #da554a;
}

.staking::after {
  content: "";
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -26px;
  border-bottom: #ed1c24 solid 4px;
}
</style>
