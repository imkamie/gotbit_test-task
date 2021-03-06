<template>
  <div class="staking-app">
    <div class="header">
      <h2>Staking App</h2>
      <div v-if="isApproved" class="approved">Wallet approved</div>
    </div>

    <div v-if="!isApproved" class="token-cards">
      <TokenCardRadio amount="100 - 299" apy="100.00" :duration="30" />
      <TokenCardRadio amount="100 - 299" apy="125.00" :duration="60" />
      <TokenCardRadio amount="500 - 1000" apy="150.00" :duration="90" />
    </div>
    <ul v-if="isApproved && !isStaked" class="token-cards">
      <li v-for="value in stakeInfo" :key="value">
        <TokenCardRadio
          @change="updateStake(value)"
          :value="value"
          amount="100 - 299"
          :apy="(value.rates / toPercents).toFixed(2)"
          :duration="value.periods / toMonth"
        />
      </li>
    </ul>

    <div v-if="isStaked">
      <div class="stake-info">
        <h2 class="tokens-earned-amount">
          {{ Math.trunc(reward * rewardRounding) / rewardRounding }}
        </h2>
        <div class="tokens-earned">TKN earned</div>
        <div class="token-cards-group">
          <div class="token-card-wrapper-date">
            <TokenStaking :info="timerStart" text="From" />
          </div>
          <div class="token-card-wrapper-date">
            <TokenStaking :info="timerFinish" text="To" />
          </div>
          <div class="token-card-wrapper-tkn">
            <TokenStaking
              :info="stakingTokens.toString() + ' TKN'"
              text="Staked"
            />
          </div>
          <div class="token-card-wrapper-apy">
            <TokenStaking
              :info="(pickedStake.rates / toPercents).toFixed(2) + '%'"
              text="APY"
            />
          </div>
        </div>
      </div>
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

    <div v-if="!isStaked" class="input-item">
      <TokenInput placeholder="" v-if="isConnected && isApproved" />
    </div>

    <div class="btns-group">
      <div class="btn-pair">
        <div class="btn-wrapper">
          <ButtonItem
            v-if="!isConnected"
            :yellow="true"
            text="Connect wallet"
            @click="showModal"
          />
          <ButtonItem
            v-else-if="isConnected && !isApproved"
            :yellow="true"
            text="Approve wallet"
            @click="approve"
          />
          <ButtonItem
            v-else-if="isConnected && isApproved && !isStaked"
            :yellow="true"
            text="Stake"
            @click="stake"
          />
          <CountDownTimer
            v-if="isStaked && !timerExpired"
            :duration="pickedStake.periods"
          />
          <ButtonItem
            v-else-if="isStaked && timerExpired"
            :yellow="true"
            text="Restake"
          />
        </div>

        <div class="btn-wrapper">
          <ButtonItem
            v-if="isStaked && !timerExpired"
            :yellow="true"
            text="Replenish"
          />
          <ButtonItem
            v-else-if="isStaked && timerExpired"
            :white="true"
            text="Unstake"
            @click="unStake"
          />
        </div>
      </div>

      <div class="btn-wrapper">
        <ButtonItem
          :white="true"
          text="View contract"
          @click="redirectToContract(contractLink)"
        />
      </div>
    </div>
  </div>
  <TransactionNotification
    v-if="isUnStaked && isNotificationVisible"
    @closeNotification="closeNotification"
  />
  <SelectPayment v-if="isPopupVisible" @closePopup="closeModal" />
</template>

<script>
import TokenCardRadio from "./TokenCardRadio.vue";
import InfoItem from "./InfoItem.vue";
import ButtonItem from "./ButtonItem.vue";
import SelectPayment from "./SelectPayment.vue";
import TokenInput from "./TokenInput.vue";
import TokenStaking from "./TokenStaking.vue";
import { redirectContractAddress } from "../utils/constants";
import { mapGetters } from "vuex";
import CountDownTimer from "./CountDownTimer.vue";
import TransactionNotification from "./TransactionNotification.vue";
import { toMonth, rewardRounding, toPercents } from "../utils/constants";

export default {
  name: "stakingApp",
  components: {
    TransactionNotification,
    CountDownTimer,
    TokenInput,
    ButtonItem,
    InfoItem,
    TokenCardRadio,
    SelectPayment,
    TokenStaking,
  },
  data() {
    return {
      isPopupVisible: false,
      isNotificationVisible: false,
      contractLink: redirectContractAddress,
      toMonth: toMonth,
      rewardRounding: rewardRounding,
      toPercents: toPercents,
    };
  },
  mutations: {
    pickedStake: function (state, { value }) {
      Object.assign(state, {
        rates: value.rates,
        periods: value.periods,
      });
    },
  },
  computed: {
    ...mapGetters([
      "isConnected",
      "isApproved",
      "stakeInfo",
      "pickedStake",
      "isStaked",
      "isUnStaked",
      "stakingTokens",
      "reward",
      "timerStart",
      "timerFinish",
      "timerExpired",
    ]),
  },
  methods: {
    closeModal() {
      this.isPopupVisible = false;
    },
    closeNotification() {
      this.isNotificationVisible = false;
    },
    showModal() {
      this.isPopupVisible = true;
    },
    redirectToContract(url) {
      const redirectWindow = window.open(url, "_blank");
      redirectWindow.location;
    },
    async approve() {
      await this.$store.dispatch("approveWallet");
    },
    updateStake(value) {
      this.$store.commit("setPickedStake", value);
    },
    async stake() {
      if (this.$store.getters.stakingTokens) {
        await this.$store.dispatch("stakeTokens");
      }
    },
    async unStake() {
      await this.$store.dispatch("unStakeTokens");
      this.isNotificationVisible = true;
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
  background: var(--color-background-white);
  box-shadow: var(--color-box-shadow);
  border-radius: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.approved {
  background: var(--color-background-light-grey);
  border-radius: 16px;
  padding: 12px 52px 12px 16px;
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: var(--color-text-grey);
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
  color: var(--color-text-secondary);
}

.token-cards {
  display: flex;
  justify-content: space-between;
  margin-top: 52px;
  list-style: none;
  padding: 0;
}

.token-cards-group {
  display: flex;
  justify-content: space-between;
}

.stake-info {
  margin-top: 90px;
  padding: 56px 64px 32px;
  background: var(--color-background-white);
  border: 1px solid var(--color-border-default);
  box-sizing: border-box;
  border-radius: 24px;
}

.stake-info:before {
  content: url("../assets/hand.png");
  position: absolute;
  bottom: 60px;
  right: 210px;
}

.tokens-earned-amount {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 44px;
  line-height: 56px;
  letter-spacing: 0.06em;
  color: var(--color-text-accent);
}

.tokens-earned {
  margin-bottom: 24px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: var(--color-subtext-light);
}

.token-card-wrapper-date {
  width: 234px;
}

.token-card-wrapper-tkn {
  width: 214px;
}

.token-card-wrapper-apy {
  width: 200px;
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

.btn-pair {
  display: flex;
  justify-content: space-between;
  width: 472px;
}

.btn-wrapper {
  width: 230px;
}
</style>
