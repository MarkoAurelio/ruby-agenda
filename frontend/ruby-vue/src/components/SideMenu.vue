<template>
  <q-drawer
    v-model="open"
    side="left"
    overlay
    behavior="mobile"
  >
    <div class="drawer-content">
      <div class="flex justify-between items-center q-mb-lg">
        <q-img
          width="100px"
          src="~assets/full-logo.svg"
        />
        <q-btn
          flat
          @click="closeMenu"
        >
          <q-icon
            size="18px"
            name="fa-light fa-xmark"
          />
        </q-btn>
      </div>
      <q-list>
        <q-item
          v-for="(item, index) in menuItems"
          :key="index"
          v-ripple
          clickable
          class="drawer-item"
          dense
          :active="$route.name === item.page"
          active-class="drawer-active-item"
          :to="item.page ? {name: item.page} : undefined"
          @click="item.action"
        >
          <q-item-section
            side
            class="drawer-icon-section"
          >
            <q-icon
              size="16px"
              :name="item.icon"
            />
          </q-item-section>
          <q-item-section>{{ item.title }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>

<script>
import { mapStores } from 'pinia';
import { RouteNames } from '../utils/consts';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'SideMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  data() {
    return {
      menuItems: [
        { title: 'Dashboard', icon: 'fa-light fa-chart-line', page: RouteNames.HOME },
        { title: 'Perfil', icon: 'fa-light fa-address-card', page: RouteNames.PROFILE },
        { title: 'Sair', icon: 'fa-light fa-arrow-left-from-line', action: this.logout },
      ],
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    open: {
      get() {
        return this.isOpen;
      },
      set() {
        this.closeMenu();
      },
    },
  },
  methods: {
    async logout() {
      await this.authStore.logout();
    },
    closeMenu() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .drawer-content {
    padding: 20px;
  }
  .drawer-item {
    border-radius: 8px;
    padding: 12px;
    height: 40px;
    color: $primary;
  }
  .drawer-icon-section {
    padding: 0;
    margin-right: 12px;
  }
  .q-icon {
    color: $primary;
  }
  .drawer-active-item {
    background-color: grey;
    color: black;
    font-weight: 700;
  }
  .drawer-active-item .q-icon {
    color: black;
  }
</style>
