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
                <contact-card
                  :key="index"
                  :id="item.id"
                  :name="item.name"
                  :cpf="item.cpf"
                  @open="showContact"
                />
              </q-virtual-scroll>
            </q-card-section>
          </q-card>
        </div>
        <q-card class="contact-list col q-mx-md">
          <q-card-section>
            <p>working on</p>
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
import SearchField from 'components/inputs/SearchField.vue';
import TextField from 'components/inputs/TextField.vue';
import ContactCard from 'components/ContactCard.vue';
import ContactForm from 'components/ContactForm.vue';
import { useContactStore } from '../stores/contact';

export default {
  name: 'HomePage',
  components: { SearchField, ContactCard, TextField, ContactForm },
  data() {
    return {
      searchQuery: '',
      dialogOpen: false,
    };
  },
  computed: {
    ...mapStores(useContactStore),
    contacts() { return this.contactStore.filteredContacts(this.searchQuery); },
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
      this.handleCreateDialog()
    },
  },
};
</script>

<style lang="scss">
  .content > div {
    gap: 16px;
  }
</style>
