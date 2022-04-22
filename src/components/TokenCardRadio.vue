<template>
  <div v-if="!isApproved" class="card">
    <div class="duration">{{ duration }} Days</div>
    <div class="apy">APY: {{ apy }}%</div>
    <div class="amount">Amount: {{ amount }} TKN</div>
  </div>
  <label v-else>
    <input type="radio" name="pickedStake" value="{{ value }}" />
    <div class="card-radio">
      <div class="duration">{{ duration }} Days</div>
      <div class="apy">APY: {{ apy }}%</div>
      <div class="amount">Amount: {{ amount }} TKN</div>
    </div>
  </label>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TokenCardRadio",
  computed: {
    ...mapGetters(["isConnected", "isApproved"]),
  },
  props: {
    duration: {
      type: Number,
      required: true,
    },
    apy: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.card {
  background: var(--color-background-white);
  border: 1px solid var(--color-border-default);
  box-sizing: border-box;
  border-radius: 24px;
  padding: 24px 28px 20px 28px;
  width: 330px;
  max-height: 163px;
}

[type="radio"] {
  display: none;
}

[type="radio"]:checked + div {
  background: var(--color-background-light-grey);
  box-shadow: none;
}

.card-radio {
  background: var(--color-background-white);
  box-shadow: var(--color-box-shadow);
  border-radius: 24px;
  padding: 24px 28px 20px 28px;
  width: 330px;
  max-height: 163px;
}

.card-radio:hover {
  cursor: pointer;
}

.duration {
  font-weight: 600;
  font-size: 36px;
  line-height: 40px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.apy {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: var(--color-text-accent);
  margin-bottom: 8px;
}

.apy::after {
  content: url("../assets/Question.svg");
  position: absolute;
  margin-left: 9px;
  top: 2px;
}

.apy:hover::after {
  content: url("../assets/QuestionRed.svg");
  position: absolute;
  margin-left: 9px;
  top: 2px;
}

.apy::before {
  content: "Tip text hover";
  position: absolute;
  bottom: -6px;
  left: 185px;
  width: 120px;
  height: 42px;
  background: url("../assets/tip.svg") no-repeat;
  border-radius: 12px;
  opacity: 0;
  transition: all 0.8s;

  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-text-white);

  display: flex;
  align-items: center;
  justify-content: center;
}

.apy:hover::before {
  opacity: 1;
}

.amount {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: var(--color-text-grey);
}
</style>
