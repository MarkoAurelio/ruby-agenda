<template>
  <q-drawer
    v-model="open"
    side="left"
    overlay
    behavior="mobile"
  >
    <div class="drawer-content full-height column justify-between">
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
      <q-btn flat label="Apagar Conta" color="red" @click="handleDeleteConfirmation" />
    </div>
  </q-drawer>
  <delete-dialog
    :is-open="confirmDeleteOpen"
    :title="'Excluir conta!'"
    :warn-message="'Tem certeza que deseja excluir? Esta ação não pode ser desfeita.'"
    @submit="deleteAccount"
    @close="confirmDeleteOpen = false"
  >
    <q-card-section class="bg-white q-pt-md text-black">
      <p>
        Confirme digitando sua senha novamente.
      </p>
      <password-field
        v-model="password"
        class="q-pt-xs"
        :placeholder="'Digite sua senha'"
        :autocomplete="'current-password'"
      />
    </q-card-section>
  </delete-dialog>
</template>

<script>
import { mapStores } from 'pinia';
import { RouteNames } from '../utils/consts';
import { useAuthStore } from '../stores/auth';
import { PasswordField } from 'components/inputs';
import DeleteDialog from 'components/DeleteDialog.vue';

export default {
  name: 'SideMenu',
  components: { PasswordField, DeleteDialog },
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
        { title: 'Contatos', icon: 'fa-regular fa-address-book', page: RouteNames.HOME },
        { title: 'Sair', icon: 'fa-solid fa-arrow-left', action: this.logout },
      ],
      confirmDeleteOpen: false,
      password: ''
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
    handleDeleteConfirmation() {
      this.confirmDeleteOpen = !this.confirmDeleteOpen;
    },
    async deleteAccount() {
      await this.authStore.delete(this.password);
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
    margin-bottom: 8px;
  }
  .drawer-icon-section {
    padding: 0;
    margin-right: 12px;
  }
  .drawer-active-item {
    background-color: #d1dff8;
    color: $primary;
    font-weight: 700;
  }
</style>
