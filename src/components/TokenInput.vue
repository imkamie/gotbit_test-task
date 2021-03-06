<template>
  <div>
    <div class="input">
      <input
        :disabled="isDisabled"
        :class="className"
        class="token-input"
        :placeholder="placeholder"
        v-model="value"
        @input="validate"
      />
      <button class="input-button" @click="showMaxTokens">Max</button>
    </div>
    <div v-if="!isValid" class="input-error">Error proper amount</div>
    <div class="reward-count">
      Reward for 30 days:
      <span class="reward">{{ calculateReward(this.value) }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toMonth, year, apyDivider, rewardRounding } from "../utils/constants";

export default {
  name: "TokenInput",
  props: {
    placeholder: {
      type: String,
      default: " ",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: "",
      isValid: true,
    };
  },
  computed: {
    ...mapGetters(["pickedStake", "reward", "stakingTokens"]),
    className() {
      return {
        error: this.error,
      };
    },
    isDisabled() {
      return !this.$store.state.pickedStake;
    },
  },
  methods: {
    showMaxTokens() {
      this.value = String(this.$store.state.tokenBalance);
      this.validate();
    },
    validate() {
      this.value = this.value.replace(/[^\d]/g, "");

      if (Number(this.value) > this.$store.state.tokenBalance) {
        this.value = String(this.$store.state.tokenBalance);
      }

      if (Number(this.value) === 0 && this.value.length !== 0) {
        this.className.error = true;
        return (this.isValid = false);
      }

      this.className.error = false;
      return (this.isValid = true);
    },
    calculateReward(input) {
      if (Number(input) === 0) {
        return "";
      }

      this.$store.commit("setStakingTokens", Number(input));

      const reward =
        (Number(input) * this.pickedStake.rates * this.pickedStake.periods) /
        toMonth /
        apyDivider /
        year;

      this.$store.commit("setReward", reward);

      return Math.trunc(reward * rewardRounding) / rewardRounding + " TKN";
    },
  },
};
</script>

<style scoped>
.token-input {
  width: 100%;
  padding: 14px 16px;
  background: var(--color-background-white);
  border: 1px solid var(--color-border-default);
  box-sizing: border-box;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: var(--color-text-secondary);
  outline: none;
}

.error {
  border: 1px solid var(--color-border-error);
}

.input-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px 16px;
  border: none;
  font: inherit;
  background-color: transparent;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  text-align: right;
  color: var(--color-background-primary);
}

.input-error {
  position: absolute;
  margin-left: 16px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-text-error);
}

.reward-count {
  margin-top: 40px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: var(--color-text-secondary);
}

.reward {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: var(--color-text-accent);
}
</style>
