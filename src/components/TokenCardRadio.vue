<template>
  <div v-if="!isConnected || !isApproved" class="card">
    <div class="duration">{{ duration }} Days</div>
    <div class="apy">APY: {{ apy }}%</div>
    <div class="amount">Amount: {{ amount }} TKN</div>
  </div>
  <label v-else>
    <input type="radio" name="test" />
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
  },
};
</script>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #dfebf5;
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
  background: #eff3f8;
  box-shadow: none;
}

.card-radio {
  background: #ffffff;
  box-shadow: 0 16px 44px rgba(78, 102, 120, 0.1);
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
  color: #343840;
  margin-bottom: 8px;
}

.apy {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #da554a;
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
  color: #ffffff;

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
  color: #828a97;
}
</style>
