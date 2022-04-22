<template>
  <button class="btn" @click="onClick" :class="className">
    <img class="btn-icon" v-if="icon" :src="path" alt="Payment icon" />
    <ClipLoader v-if="loading" />
    <div v-if="loading">Waiting</div>
    <div v-else>{{ text }}</div>
  </button>
</template>

<script>
import ClipLoader from "./ClipLoader.vue";

export default {
  name: "ButtonItem",
  components: { ClipLoader },
  props: {
    text: {
      type: String,
      required: true,
    },
    yellow: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
    },
  },
  computed: {
    className() {
      return {
        loading: this.loading,
        yellow: this.yellow,
        white: this.white,
      };
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 18px;
  border: none;
  border-radius: 12px;
  text-align: center;
  font-family: "Noto Sans", sans-serif;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.yellow {
  background: var(--color-background-primary);
  color: var(--color-text-white);
}

.yellow div {
  font-weight: 700;
}

.white {
  border: 1px solid var(--color-border-default);
  background: var(--color-background-white);
  color: var(--color-text-secondary);
}

.loading {
  background: var(--color-background-primary-dark);
  color: var(--color-text-white);
}

.loading div {
  font-weight: 700;
}

.btn-icon {
  margin-right: 16px;
}
</style>
