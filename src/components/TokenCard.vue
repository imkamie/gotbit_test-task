<template>
  <div class="card">
    <div class="duration">{{ duration }} Days</div>
    <div class="apy">APY: {{ apy }}%</div>
    <div class="amount">Amount: {{ amount }} TKN</div>
  </div>
</template>

<script setup>
defineProps({
  duration: {
    type: Number,
    required: true,
  },
  apy: {
    type: Number,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #dfebf5;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 24px 80px 20px 28px;
  max-width: 330px;
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
  content: url("../../public/Question.svg");
  position: absolute;
  margin-left: 9px;
  top: 2px;
}

.apy:hover::after {
  content: url("../../public/QuestionRed.svg");
  position: absolute;
  margin-left: 9px;
  top: 2px;
}

.apy::before {
  content: "Tip text hover";
  position: absolute;
  bottom: -6px;
  left: 189px;
  width: 116px;
  height: 42px;
  background: url("public/tip.png");
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
