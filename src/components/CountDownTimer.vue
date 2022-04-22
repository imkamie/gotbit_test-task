<template>
  <div class="timer">
    <span class="time">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
import {
  timeOptions,
  getMinutes,
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
    /*
    Function for counting real time in stake. Use this in real project.

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      let days = Math.floor(timeLeft / 86400);
      let hoursLeft = Math.floor(timeLeft - (days * 86400));
      let hours = Math.floor(hoursLeft / 3600);
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutesLeft = Math.floor(hoursLeft - hours * 3600);
      let minutes = Math.floor(minutesLeft / 60);

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (days < 1) {
        return `${hours}:${minutes}:${seconds}`;
      }

      return `${days}:${hours}:${minutes}:${seconds}`;
    },
    */

    // Function for testing and faster work
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      let hours = Math.floor(timeLeft / toHours);
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = Math.floor(timeLeft / toMinutes);

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      let seconds = Math.floor(timeLeft % toSeconds);

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${hours}:${minutes}:${seconds}`;
    },
    timeLeft() {
      // Divided the duration by 14400 to get 3 minutes out of 30 days, 6 minutes out of 60 days, etc.
      return this.duration / getMinutes - this.timePassed;
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
    // To find actual finish time code should be:
    // const finish = new Date();
    // finish.setDate(finish.getDate() + 2592000/86400);

    // This code adds only minutes
    const finish = new Date(
      start.getTime() + (this.duration / getMinutes) * 1000
    );
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
