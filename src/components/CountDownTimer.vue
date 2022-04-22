<template>
  <div class="timer">
    <span class="time">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
import {
  timeOptions,
  toMonth,
  toHours,
  toMinutes,
  toSeconds,
} from "../utils/constants";

export default {
  name: "CountDownTimer",
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
    };
  },
  props: {
    duration: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      let days = Math.floor(timeLeft / toMonth);
      let hoursLeft = Math.floor(timeLeft - days * toMonth);
      let hours = Math.floor(hoursLeft / toHours);
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutesLeft = Math.floor(hoursLeft - hours * toHours);
      let minutes = Math.floor(minutesLeft / toMinutes);

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      let seconds = timeLeft % toSeconds;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (days < 1) {
        return `${hours}:${minutes}:${seconds}`;
      }

      return `${days}:${hours}:${minutes}:${seconds}`;
    },

    timeLeft() {
      return this.duration - this.timePassed;
    },
  },
  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    },
  },
  mounted() {
    const start = new Date();
    this.$store.commit(
      "setTimerStart",
      start.toLocaleString("en-US", timeOptions)
    );

    const finish = new Date();
    finish.setDate(finish.getDate() + this.duration / toMonth);

    this.$store.commit(
      "setTimerFinish",
      finish.toLocaleString("en-US", timeOptions)
    );
    this.startTimer();
  },
  methods: {
    onTimesUp() {
      this.$store.commit("setTimerExpired");
      clearInterval(this.timerInterval);
    },

    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
  },
};
</script>

<style scoped>
.timer {
  width: 100%;
  padding: 18px 0;
  background: var(--color-background-grey);
  border-radius: 12px;
  text-align: center;
}

.time {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-text-white);
}
</style>
