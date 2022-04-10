<template>
  <div class="staking-app">
    <div class="header">
      <h2>Staking App</h2>
      <div v-if="isConnected" class="approved">Wallet approved</div>
    </div>
    <div class="token-cards">
      <TokenCard amount="100 - 299" apy="103,23" duration="30" />
      <TokenCard amount="100 - 299" apy="116,86" duration="90" />
      <TokenCard amount="500 - 1000" apy="129,97" duration="150" />
    </div>
    <InfoItem text="To perform actions on the page, connect your wallet" />
    <div class="btns-group">
      <div class="btn-wrapper">
        <ButtonItem
          v-if="!isConnected"
          :yellow="true"
          text="Connect wallet"
          @click="showModal"
        ></ButtonItem>
      </div>
      <div class="btn-wrapper">
        <ButtonItem
          :white="true"
          text="View contract"
          @click="redirectToContract(contractLink)"
        ></ButtonItem>
      </div>
    </div>
  </div>
  <SelectPayment v-if="isVisible" @closePopup="closeModal" />
</template>

<script>
import TokenCard from "./TokenCard.vue";
import InfoItem from "./InfoItem.vue";
import ButtonItem from "./ButtonItem.vue";
import SelectPayment from "./SelectPayment.vue";
import { mapGetters } from "vuex";
export default {
  name: "stakingApp",
  components: {
    ButtonItem,
    InfoItem,
    TokenCard,
    SelectPayment,
  },
  data() {
    return {
      isVisible: false,
      contractLink:
        "https://testnet.bscscan.com/address/0x3514E8A6Ca64B6861B7054bbFb5A5ea75392eb9C",
    };
  },
  computed: {
    ...mapGetters(["isConnected"]),
  },
  methods: {
    closeModal() {
      this.isVisible = false;
    },
    showModal() {
      this.isVisible = true;
    },
    redirectToContract(url) {
      const redirectWindow = window.open(url, "_blank");
      redirectWindow.location;
    },
  },
};
</script>

<style scoped>
.staking-app {
  max-width: 1170px;
  max-height: 690px;
  margin-top: 133px;
  padding: 64px 56px;
  background: #ffffff;
  box-shadow: 0 16px 44px rgba(78, 102, 120, 0.1);
  border-radius: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.approved {
  background: #eff3f8;
  border-radius: 16px;
  padding: 12px 52px 12px 16px;
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #828a97;
}

.approved:after {
  content: url("../assets/approved.svg");
  position: absolute;
  right: 16px;
  top: 16px;
  /*background: url("../assets/approved.svg");*/
}

h2 {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: 0.06em;
  color: #343840;
}

.token-cards {
  display: flex;
  justify-content: space-between;
  margin: 52px 0 55px;
}

.btns-group {
  display: flex;
  justify-content: space-between;
  margin-top: 52px;
}

.btn-wrapper {
  width: 230px;
}
</style>
