<template>
  <q-page class="flex-start fit">
    <div class="fit col">
      <q-card class="q-my-lg q-mx-xl">
        <q-card-section class="q-pb-none flex">
          <div class="row justify-between items-center full-width">
            <div class="col q-pr-lg">
              <search-field
                v-model="searchQuery"
                :placeholder="$t('SEARCH_CONTACT')"
              />
            </div>
            <div class="col"></div>
            <div class="self-center">
              <q-btn
                class="action"
                color="primary"
                :label="'Criar Contato'"
                outline
                unelevated
                @click="handleCreateDialog"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="fit row">
        <q-card class="contact-list col q-mx-md">
          <q-card-section>
            <div class="text-h6 text-center">
              Contatos
            </div>
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
              />
            </q-virtual-scroll>
          </q-card-section>
        </q-card>
        <q-card class="contact-list col q-mx-md">
          <q-card-section>
            <p>working on</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialogOpen">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Novo Contato</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <form class="content">
            <text-field
              v-model="contact.name"
              class="q-pb-md"
              :title="$t('FULL_NAME')"
              :placeholder="$t('INSERT_NAME')"
              type="text"
            />
            <text-field
              v-model="contact.cpf"
              :title="$t('EMAIL')"
              :placeholder="$t('EMAIL_EXAMPLE')"
              type="number"
            />
          </form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="between">
          <q-btn flat label="Excluir" color="red" @click="confirmDeleteOpen = true" />
          <q-btn flat label="Salvar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="confirmDeleteOpen"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Confirmar exclusão</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Tem certeza que deseja excluir? Esta ação não pode ser desfeita.
        </q-card-section>

        <q-card-actions align="right" class="bg-white ">
          <q-btn flat label="Cancelar" v-close-popup color="primary"/>
          <q-btn
            label="Confirmar"
            flat
            color="red"
            v-close-popup
            @click="handleCreateDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapStores } from 'pinia';
import SearchField from 'components/inputs/SearchField.vue';
import TextField from 'components/inputs/TextField.vue';
import ContactCard from 'components/ContactCard.vue';
import { useContactStore } from '../stores/contact';

export default {
  name: 'HomePage',
  components: { SearchField, ContactCard, TextField },
  data() {
    return {
      searchQuery: '',
      dialogOpen: false,
      confirmDeleteOpen: false,
      contact: {
        name: '',
        cpf: '',
        cep: null,
        street: '',
        city: '',
      },
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
    },
  },
};
</script>
