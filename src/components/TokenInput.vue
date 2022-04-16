<template>
  <div>
    <div class="input">
      <input class="token-input" :placeholder="placeholder" v-model="value" />
      <button class="input-button" @click="showMaxTokens">Max</button>
    </div>
    <div class="reward-count">
      Reward for 30 days:
      <span class="reward">400 TKN</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenInput",
  props: {
    placeholder: {
      type: String,
      default: " ",
    },
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    showMaxTokens() {
      this.value = this.$store.state.tokenBalance;
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
