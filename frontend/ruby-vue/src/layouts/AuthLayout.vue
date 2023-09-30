<template>
  <q-layout view="lhh lpR lfr">
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthLayout',
};
</script>
