<template>
  <div class="staking-app">
    <div class="header">
      <h2>Staking App</h2>
      <div v-if="isConnected" class="approved">Wallet approved</div>
    </div>
    <div class="stake-info">
      <h2 class="tokens-earned-amount">26,6666</h2>
      <div class="tokens-earned">TKN earned</div>
      <div class="token-cards-group">
        <TokenStaking info="22 Jun, 14:14" text="From" />
        <TokenStaking info="22 Jun, 14:17" text="To" />
        <TokenStaking info="960 TKN" text="Staked" />
        <TokenStaking info="129,97%" text="APY" />
      </div>
    </div>
    <div class="timer"></div>
    <div class="btns-group">
      <div class="btn-wrapper">
        <ButtonItem :yellow="true" text="Replenish"></ButtonItem>
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
</template>

<script>
import ButtonItem from "./ButtonItem.vue";
import TokenStaking from "./TokenStaking.vue";
import { redirectAddress } from "../utils/constants";
import { mapGetters } from "vuex";

export default {
  name: "StakeProgress",
  components: {
    ButtonItem,
    TokenStaking,
  },
  data() {
    return {
      isVisible: false,
      contractLink: redirectAddress,
    };
  },
  methods: {
    redirectToContract(url) {
      const redirectWindow = window.open(url, "_blank");
      redirectWindow.location;
    },
  },
  computed: {
    ...mapGetters(["isConnected"]),
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

.token-cards-group {
  display: flex;
  justify-content: space-between;
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

.stake-info {
  margin-top: 90px;
  padding: 56px 64px 32px;
  background: #ffffff;
  border: 1px solid #dfebf5;
  box-sizing: border-box;
  border-radius: 24px;
}

.stake-info:before {
  content: url("../assets/hand.png");
  position: absolute;
  bottom: 60px;
  right: 230px;
}

.tokens-earned-amount {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: 0.06em;
  color: #da554a;
}

.tokens-earned {
  margin-bottom: 24px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #b3b7bf;
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
