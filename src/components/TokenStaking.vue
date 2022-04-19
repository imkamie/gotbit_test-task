<template>
  <div class="token-staking">
    <div class="token-staking_text">{{ text }}</div>
    <div class="token-staking_info">{{ info }}</div>
  </div>
</template>

<script>
export default {
  name: "TokenStaking",
  props: {
    text: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.token-staking {
  width: 100%;
  padding: 24px 28px;
  background: #eff3f8;
  border-radius: 12px;
}

.token-staking_text {
  margin-bottom: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #828a97;
}

.token-staking_info {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: #343840;
}
</style>
