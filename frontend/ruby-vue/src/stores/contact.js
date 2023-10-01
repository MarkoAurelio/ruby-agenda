import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import ContactService from '../services/ContactService';
import { filterItems, notifyError } from '../utils/helpers';
import { StateOptions } from "../utils/consts";

export const useContactStore = defineStore("contact", {
  state: () => ({
    contacts: [],
    contact: {},
  }),
  persist: true,
  getters: {
    filteredContacts: (state) => (term) =>
      filterItems(state.contacts, term, "name"),
    isMissingInfo: (state) => {
      const { name, cpf, phone, street, number, neighborhood, cep, city } =
        state.contact;
      return !(
        !!name &&
        !!cpf &&
        !!phone &&
        !!street &&
        !!number &&
        !!neighborhood &&
        !!cep &&
        !!city &&
        !!state.contact.state?.value
      );
    },
  },
  actions: {
    async createUpdate() {
      try {
        Loading.show();
        const { data } = await ContactService.createUpdate({
          contact: {
            ...this.contact,
            state: this.contact?.state?.value,
          },
        });
        if (!this.contact.id) this.contacts.push(data);
        return true;
      } catch (e) {
        const error =
          e.response?.status === 401
            ? "Já existe uma conta associada a este e-mail, faça login para continuar"
            : e;
        notifyError(error);
        return false;
      } finally {
        Loading.hide();
      }
    },
    async fetchContacts() {
      try {
        this.$reset();
        const { data } = await ContactService.getContacts();
        this.contacts = data;
      } catch (e) {
        notifyError(e);
        throw e;
      }
    },
    async fetchContact(contactID) {
      try {
        this.contact = {};
        const { data } = await ContactService.getContact(contactID);
        this.contact = data;
        this.contact.state = StateOptions.find((s) => s.value === data.state);
      } catch (e) {
        notifyError(e);
        throw e;
      }
    },
    async delete() {
      try {
        const { data } = await ContactService.delete(this.contact.id);
        this.fetchContacts();
        this.clearContact();
      } catch (e) {
        notifyError(e);
        throw e;
      }
    },
    async searchAddress() {
      try {
        if (this.contact.cep) {
          const { data } = await ContactService.fetchAddress(this.contact.cep);
          if (data.error || data.erro)
            notifyError(data.error ?? "CEP Inválido");
          else {
            this.contact = {
              ...this.contact,
              city: data.localidade,
              neighborhood: data.bairro,
              state: StateOptions.find((s) => s.value === data.uf),
              street: data.logradouro?.startsWith("Rua ")
                ? data.logradouro?.slice(4)
                : data.logradouro,
            };
          }
        }
      } catch (e) {
        notifyError(e);
        throw e;
      }
    },
    clearContact() {
      this.contact = {};
    },
  },
});
