<template>
  <div class="info">
    <div class="info-text">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.info {
  padding: 25px;
  background: var(--color-background-light-grey);
  border-radius: 16px;
}

.info-text {
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.2875px;
  color: var(--color-text-grey);
  margin-left: 50px;
}

.info::before {
  content: url("../assets/Danger Circle.svg");
  position: absolute;
  top: 22px;
}
</style>
