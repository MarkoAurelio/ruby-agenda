<template>
  <q-dialog v-model="open">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row justify-between align-center">
        <div class="text-h6">Novo Contato</div>
        <q-icon
          name="fa-light fa-xmark"
          class="cursor-pointer"
          size="20px"
          @click="emitClose"
          color="black"
        />
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 60vh" class="scroll">
        <form class="content">
          <div class="row justify-between">
            <div class="col full-width">
              <text-field
                v-model="contact.name"
                class="q-pb-md"
                :title="'Nome Completo'"
                type="text"
              />
            </div>
            <div class="col full-width">
              <text-field
                v-model="contact.cpf"
                :title="'CPF'"
                :mask="cpfMask"
                :placeholder="'xxx.xxx.xxx-xx'"
                type="text"
              />
            </div>
          </div>
          <div class="row justify-between">
            <div class="col full-width">
              <text-field
                v-model="contact.phone"
                class="q-pb-md"
                :title="'Telefone'"
                :mask="phoneMask"
                :placeholder="'(xx) xxxxxx-xxxx'"
                type="text"
              />
            </div>
            <div class="col full-width">
              <text-field
                searchable
                v-model="contact.cep"
                :title="'CEP'"
                :mask="cepMask"
                :placeholder="'xx.xxx-xxx'"
                type="text"
                @search="searchAddress"
              />
            </div>
          </div>
          <div class="row justify-between">
            <div class="col full-width">
              <text-field
                v-model="contact.street"
                class="q-pb-md"
                :title="'Rua'"
                type="text"
              />
            </div>
            <div class="col full-width">
              <text-field
                v-model="contact.neighborhood"
                :title="'Bairro'"
                type="text"
              />
            </div>
          </div>
          <div class="row justify-between">
            <div class="col">
              <text-field
                v-model="contact.city"
                class="q-pb-md"
                :title="'Cidade'"
                type="text"
              />
            </div>
            <div class="col">
              <select-field
                v-model="contact.state"
                :title="'Estado'"
                :options="stateOptions"
              />
            </div>
          </div>
          <div class="row justify-between">
            <div class="col full-width">
              <text-field
                v-model="contact.number"
                :title="'Número'"
                type="text"
              />
            </div>
            <div class="col full-width">
              <text-field
                v-model="contact.complement"
                class="q-pb-md"
                :title="'Complemento'"
                type="text"
              />
            </div>
          </div>
        </form>
      </q-card-section>
      <q-separator />
      <q-card-actions :align="contact.id? 'between' : 'right'">
        <q-btn v-if="contact.id" flat label="Excluir" color="red" @click="confirmDeleteOpen = true" />
        <q-btn flat label="Salvar" color="primary" @click="emitSubmit" :disable="isMissingInfo"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <delete-contact-dialog
    :is-open="confirmDeleteOpen"
    @submit="deleteContact"
    @close="confirmDeleteOpen = false"
  />
</template>

<script>
import { mapStores } from 'pinia';
import { useContactStore } from '../stores/contact';
import TextField from 'components/inputs/TextField.vue';
import SelectField from 'components/inputs/SelectField.vue';
import SearchField from 'components/inputs/SearchField.vue';
import DeleteContactDialog from 'components/DeleteContactDialog.vue';
import { StateOptions } from '../utils/consts';
import { phoneMask, cepMask, cpfMask } from '../utils/masks';
export default {
  name: 'ContactForm',
  components: { TextField, SelectField, SearchField, DeleteContactDialog },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'submit'],
  data() {
    return {
      stateOptions: StateOptions,
      confirmDeleteOpen: false,
      phoneMask,
      cepMask,
      cpfMask,
    };
  },
  computed: {
    ...mapStores(useContactStore),
    contact() {return this.contactStore.contact},
    isMissingInfo() { return this.contactStore.isMissingInfo},
    open: {
      get() {
        return this.isOpen;
      },
      set() {
        this.emitClose();
      },
    },
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    emitSubmit() {
      this.$emit('submit');
    },
    async deleteContact() {
      await this.contactStore.delete();
      if(!this.contact.id) this.emitClose();
    },
    async searchAddress() {
      await this.contactStore.searchAddress();
    }
  },
};
</script>
