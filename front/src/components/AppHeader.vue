<template>
  <q-header class="header">
    <q-toolbar class="q-pa-none toolbar">
      <q-btn
        flat
        class="header-btn"
        @click="handleSideMenu()"
      >
        <q-icon
          size="18px"
          name="fa-solid fa-bars"
        />
      </q-btn>
      <q-toolbar-title class="title text-capitalize">
        {{ headerInfo.title }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <side-menu
    v-if="sideMenuOpen"
    :is-open="sideMenuOpen"
    @close="handleSideMenu"
  />
</template>

<script>
import { mapStores } from 'pinia';
import SideMenu from 'components/SideMenu.vue';
import { RouteNames } from '../utils/consts';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'AppHeader',
  components: { SideMenu },
  data() {
    return {
      sideMenuOpen: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    headerInfo() {
      switch (this.$route.name) {
        case RouteNames.HOME:
        default:
          return { title: 'Contatos' };
      }
    },
  },
  methods: {
    handleSideMenu() {
      this.sideMenuOpen = !this.sideMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  .toolbar {
    height: 56px;
  }
  .header {
    background-color: #d1dff8;
    color: $primary;
    display: flex;
    justify-items: center;
  }
  .header .title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    padding: 0;
  }
  .header-btn {
    height: 100%;
    padding-right: 18px;
    padding-left: 18px;
  }
  .q-icon {
    color: $primary;
  }
</style>
