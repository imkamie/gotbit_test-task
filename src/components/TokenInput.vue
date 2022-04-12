<template>
  <div class="input">
    <input class="token-input" placeholder="0" />
    <div class="reward-count">
      Reward for 30 days:
      <span class="reward">400 TKN</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenInput",
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
