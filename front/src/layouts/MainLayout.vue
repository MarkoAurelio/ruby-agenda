<template>
  <q-layout view="lhh lpR lfr">
    <app-header />
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { AppHeader } from 'components';

export default {
  name: 'MainLayout',
  components: { AppHeader },
};
</script>

<style>
  .q-page-container {
    background-color: #ECF1FA;
  }
</style>
