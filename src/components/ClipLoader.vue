<template>
  <div class="v-spinner" v-if="loading" v-show="loading">
    <div class="v-clip" v-bind:style="spinnerStyle"></div>
  </div>
</template>

<script>
export default {
  name: "ClipLoader",

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#fff",
    },
    size: {
      type: String,
      default: "30px",
    },
    radius: {
      type: String,
      default: "100%",
    },
  },
  computed: {
    spinnerStyle() {
      return {
        height: this.size,
        width: this.size,
        borderWidth: "3px",
        borderStyle: "solid",
        borderColor:
          this.color +
          " rgba(255, 255, 255, 0.4)" +
          " rgba(255, 255, 255, 0.4)" +
          " " +
          this.color,
        borderRadius: this.radius,
        background: "transparent",
      };
    },
  },
};
</script>

<style>
.v-spinner {
  display: inline-block;
  margin-right: 13px;
}

.v-spinner .v-clip {
  -webkit-animation: v-clipDelay 1s 0s infinite linear;
  animation: v-clipDelay 1s 0s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  display: inline-block;
}

@-webkit-keyframes v-clipDelay {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes v-clipDelay {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
