<template>
  <div class="navbar">
    <div class="navbar-container">
      <div class="navbar-item staking">Staking</div>
      <div class="navbar-item">Bridge</div>
      <div class="navbar-item">SHO</div>
      <div v-if="!isConnected" class="navbar-item btn-wrapper">
        <ButtonItem :white="true" text="Connect wallet" @click="showModal" />
      </div>
      <div v-else class="navbar-item user-info">
        <div class="address">
          <div class="user-address">{{ showAccount(account) }}</div>
          <button @click="copyToClipBoard" class="user-address_copy">
            <img src="src/assets/copyAddress.svg" alt="Copy account address" />
          </button>
        </div>
        <div class="user-balance">{{ balance }} BUSD</div>
        <button class="more-info">
          <img src="src/assets/arrow.svg" alt="" />
        </button>
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
    ...mapGetters(["isConnected", "account", "balance"]),
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
    showModal() {
      this.isVisible = true;
    },
    showAccount(address) {
      return (
        address.substring(0, 6) + "..." + address.substring(address.length - 4)
      );
    },
    copyToClipBoard() {
      navigator.clipboard.writeText(this.$store.getters.account);
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 20px 0 14px;
  border-bottom: var(--color-border-white) solid 1px;
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
  color: var(--color-text-accent);
}

.staking::after {
  content: "";
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -26px;
  border-bottom: var(--color-border-red) solid 4px;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 8px;
  background: var(--color-background-white);
  border-radius: 12px;
}

.address {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 8px;
  background: var(--color-background-primary-light);
  border-radius: 8px;
}

.user-address {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.2875px;
  color: var(--color-text-primary-dark);
}

.user-address_copy {
  margin-left: 9px;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}

.user-balance {
  margin-left: 20px;
  margin-right: 52px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.2875px;
  color: var(--color-text-secondary);
}

.user-balance:after {
  content: url("../assets/BNB.svg");
  position: absolute;
  right: -36px;
  top: -3px;
}

.more-info {
  margin-right: 12px;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}
</style>
