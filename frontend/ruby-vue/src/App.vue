<template>
  <router-view
    :key="$route.fullPath"
  />
</template>

<script>

export default {
  name: 'App',
  async mounted() {
    this.lockOrientation();
  },
  methods: {
    lockOrientation() {
      if (this.$q.platform.is.nativeMobile) window.screen.orientation.lock('portrait');
    },
  },
};
</script>
