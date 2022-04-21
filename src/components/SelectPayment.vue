<template>
  <div class="popup-wrapper" ref="popup_wrapper">
    <div class="select-payment">
      <button class="btn-close" @click="closePopup">
        <img src="src/assets/close.svg" alt="Close button" />
      </button>
      <div class="header">
        <h4>Select the payment card that you want to use for payment</h4>
        <div class="select-payment_info-wallet">
          The selected wallet will be connected to your staking
        </div>
        <div class="buttons-container">
          <div class="btn-wrapper">
            <ButtonItem
              text="MetaMask"
              @click="connectWithMetamask"
              :white="true"
              :icon="true"
              :path="`/src/assets/metamask.svg`"
            />
          </div>
          <div class="btn-wrapper">
            <ButtonItem
              text="Walletconnect"
              @click="connectWithWalletconnect"
              :white="true"
              :icon="true"
              :path="`/src/assets/walletconnect.svg`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonItem from "./ButtonItem.vue";
import { clickConnectWalletConnect, connector } from "../utils/connectWallet";
import { mapActions } from "vuex";

export default {
  name: "SelectPayment",
  components: { ButtonItem },
  methods: {
    ...mapActions(["connect"]),
    closePopup() {
      this.$emit("closePopup");
    },
    async connectWithMetamask() {
      await this.$store.dispatch("connect");
      this.closePopup();
    },
    async connectWithWalletconnect() {
      clickConnectWalletConnect();
      await connector.createSession();
      connector.on("connect", (error, payload) => {
        if (error) {
          throw error;
        }

        const { params } = payload;
        const { accounts } = params[0];

        this.isConnected = true;
        this.address = accounts[0];
      });
      this.closePopup();
    },
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs["popup-wrapper"]) {
        vm.closePopup();
      }
    });
  },
};
</script>

<style scoped>
.popup-wrapper {
  background: linear-gradient(
    71.52deg,
    rgba(57, 91, 119, 0.3) 16.69%,
    rgba(26, 36, 44, 0.3) 81.22%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  min-height: 100%;
  z-index: 10;
}

.select-payment {
  width: 670px;
  height: 365px;
  background: #ffffff;
  box-shadow: 0 16px 44px rgba(78, 102, 120, 0.1);
  border-radius: 24px;
  z-index: 100;
}

.btn-close {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  margin-left: 620px;
  margin-top: 25px;
}

.header {
  margin: 0 56px 56px;
}

h4 {
  width: 423px;
  margin-bottom: 32px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: #000000;
}

.select-payment_info-wallet {
  margin-bottom: 24px;
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #343840;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.btn-wrapper {
  width: 271px;
  height: 108px;
}
</style>
