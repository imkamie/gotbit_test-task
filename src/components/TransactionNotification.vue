<template>
  <div class="notification" ref="notification">
    <span class="notification-text">Transaction confirmed!</span>
    <button class="btn-close-notification" @click="closeNotification">
      <img src="src/assets/close-notification.svg" alt="Close button" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TransactionNotification.vue",
  computed: {
    ...mapGetters(["isUnStaked"]),
  },
  methods: {
    closeNotification() {
      this.$emit("closeNotification");
    },
  },
  mounted() {
    document.addEventListener("click", function (item) {
      if (item.target === this.$refs["notification"]) {
        this.closeNotification();
      }
    });
  },
};
</script>

<style scoped>
.notification {
  position: absolute;
  bottom: -154px;
  left: 414px;
  padding: 24px 28px;
  background: rgba(69, 202, 114, 0.8);
  border-radius: 20px;
  z-index: 1;
}
.notification-text {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.02em;
  color: #ffffff;
}
.btn-close-notification {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  margin-left: 22px;
}
</style>
