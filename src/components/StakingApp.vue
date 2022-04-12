<template>
  <div class="staking-app">
    <div class="header">
      <h2>Staking App</h2>
      <div v-if="isConnected" class="approved">Wallet approved</div>
    </div>
    <div class="token-cards">
      <TokenCardRadio amount="100 - 299" apy="103,23" duration="30" />
      <TokenCardRadio amount="100 - 299" apy="116,86" duration="90" />
      <TokenCardRadio amount="500 - 1000" apy="129,97" duration="150" />
    </div>
    <div class="info-item">
      <InfoItem
        v-if="!isConnected"
        text="To perform actions on the page, connect your wallet"
      />
      <InfoItem
        v-if="isConnected && !isApproved"
        text="To perform actions on the page, approve your wallet"
      />
    </div>
    <div class="input-item">
      <TokenInput v-if="isConnected && isApproved" />
    </div>
    <div class="btns-group">
      <div class="btn-wrapper">
        <ButtonItem
          v-if="!isConnected"
          :yellow="true"
          text="Connect wallet"
          @click="showModal"
        ></ButtonItem>
        <ButtonItem
          v-else-if="isConnected && !isApproved"
          :yellow="true"
          text="Approve wallet"
          @click="approve"
        ></ButtonItem>
        <ButtonItem
          v-else
          :yellow="true"
          text="Stake"
        ></ButtonItem>
      </div>
<!--      <ButtonItem :yellow="true" text="periods" @click="period"></ButtonItem>-->
<!--      <ButtonItem :yellow="true" text="rates" @click="rate"></ButtonItem>-->
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
import TokenCardRadio from "./TokenCardRadio.vue";
import InfoItem from "./InfoItem.vue";
import ButtonItem from "./ButtonItem.vue";
import SelectPayment from "./SelectPayment.vue";
import TokenInput from "./TokenInput.vue";
import { redirectAddress } from "../utils/constants";
import { mapGetters } from "vuex";
export default {
  name: "stakingApp",
  components: {
    TokenInput,
    ButtonItem,
    InfoItem,
    TokenCardRadio,
    SelectPayment,
  },
  data() {
    return {
      isVisible: false,
      contractLink: redirectAddress,
    };
  },
  computed: {
    ...mapGetters(["isConnected", "isApproved", "periods", "rates"]),
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
    async approve() {
      await this.$store.dispatch("approveWallet");
    },
    // stake() {
    //   console.log("staked");
    // },
    // async period() {
    //   await this.$store.dispatch("getPeriods");
    // },
    // async rate() {
    //   await this.$store.dispatch("getRates");
    // },
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
  margin-top: 52px;
}

.info-item {
  margin-top: 55px;
}

.input-item {
  margin-top: 47px;
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
