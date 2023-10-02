<template>
  <q-page class="flex-start fit">
    <div class="fit col q-pt-lg">
      <div class="fit row">
        <div class="col q-mx-md">
          <q-card class="q-mb-lg ">
            <q-card-section class="q-pb-none flex">
              <div class="row justify-between items-center full-width">
                <div class="col">
                  <search-field
                    v-model="searchQuery"
                    :placeholder="'Pesquisar por Nome ou CPF'"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card class="contact-list col">
            <q-card-section class="row justify-between">
              <div class="text-h6 text-center">
                Contatos
              </div>
              <q-btn
                class="action"
                color="primary"
                :label="'Criar Contato'"
                outline
                unelevated
                @click="handleCreateDialog"
              />
            </q-card-section>
            <q-card-section>
              <q-virtual-scroll
                v-slot="{ item, index }"
                :items="contacts"
                :virtual-scroll-item-size="100"
              >
                <q-item :key="item.id" class="q-my-sm" v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">
                      {{getInitials(item.name)}}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ item.cpf }}</q-item-label>
                  </q-item-section>
                  <q-item-section side >
                    <div class="row contact-actions">
                      <q-icon
                        name="fa-solid fa-eye"
                        class="cursor-pointer"
                        size="20px"
                        color="primary"
                        @click="showContact(item.id)"
                      />
                      <q-icon
                        name="fa-solid fa-pen-to-square"
                        class="cursor-pointer"
                        size="20px"
                        color="primary"
                        @click="editContact(item.id)"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-virtual-scroll>
            </q-card-section>
          </q-card>
        </div>
        <q-card class="contact-list col q-mx-md">
          <q-card-section class="full-height">
            <div v-if="showOnMap" class="full-height column justify-center text-center">
              <p>
                <b>{{ contact.name }}</b> atualmente mora na Rua <b>{{ contact.street }}</b>, n° <b>{{ contact.number }}</b>,
              </p>
              <p>
                Na cidade de <b>{{ contact.city }}</b> - <b>{{ contact.state?.value }}</b>
              </p>
              <p>Imagine que aqui há um mapa, e um marcador está indicando a posiçao exata nas coordenadas: Lat: <b>{{ contact.latitude }}</b> e Long: <b>{{ contact.longitude }}</b></p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <contact-form
      :is-open="dialogOpen"
      @close="handleCreateDialog"
      @submit="createUpdate"
    />
  </q-page>
</template>

<script>
import { mapStores } from 'pinia';
import { useContactStore } from '../stores/contact';
import { SearchField } from 'components/inputs';
import ContactForm from 'components/ContactForm.vue';

export default {
  name: 'HomePage',
  components: { SearchField, ContactForm },
  data() {
    return {
      searchQuery: '',
      dialogOpen: false,
      showOnMap: false,
    };
  },
  computed: {
    ...mapStores(useContactStore),
    contacts() { return this.contactStore.filteredContacts(this.searchQuery); },
    contact() { return this.contactStore.contact; },
  },
  async mounted() {
    await this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      return this.contactStore.fetchContacts();
    },
    handleCreateDialog() {
      this.dialogOpen = !this.dialogOpen;
      if(!this.dialogOpen) this.contactStore.clearContact()
    },
    async createUpdate() {
      const success = await this.contactStore.createUpdate();
      if(success) this.handleCreateDialog();
    },
    async showContact(contactID) {
      await this.contactStore.fetchContact(contactID);
      this.showOnMap = true;
    },
    async editContact(contactID) {
      this.showOnMap = false
      await this.contactStore.fetchContact(contactID);
      this.handleCreateDialog()
    },
    getInitials(fullName) {
      return fullName?.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
    }
  },
};
</script>

<style lang="scss">
  .content > div {
    gap: 16px;
  }
  .contact-actions {
    gap: 12px;
  }
</style>
