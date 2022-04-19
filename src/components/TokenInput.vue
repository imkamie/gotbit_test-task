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
    ...mapGetters(["pickedStake", "reward"]),
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
      const reward =
        (Number(input) * this.pickedStake.rates * this.pickedStake.periods) /
        86400 /
        10000 /
        360;

      this.$store.commit("setReward", reward);

      return Math.trunc(reward * 10000) / 10000 + " TKN";
    },
  },
};
</script>

<style scoped>
.token-input {
  width: 100%;
  padding: 14px 16px;
  background: #ffffff;
  border: 1px solid #dfebf5;
  box-sizing: border-box;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #343840;
  outline: none;
}

.error {
  border: 1px solid #da554a;
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
  color: #ffd42c;
}

.input-error {
  position: absolute;
  margin-left: 16px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #da554a;
}

.reward-count {
  margin-top: 40px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #343840;
}

.reward {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: #da554a;
}
</style>
