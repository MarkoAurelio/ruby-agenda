import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import ContactService from '../services/ContactService';
import { filterItems, notifyError } from '../utils/helpers';

export const useContactStore = defineStore("contact", {
  state: () => ({
    contacts: [],
    contact: {},
  }),
  persist: true,
  getters: {
    filteredContacts: (state) => (term) =>
      filterItems(state.contacts, term, "name"),
  },
  actions: {
    async createUpdate() {
      try {
        Loading.show();
        const { data } = await ContactService.createUpdate({
          contact: this.contact,
        });

        this.contacts.push(data);
      } catch (e) {
        const error =
          e.response?.status === 401
            ? "Já existe uma conta associada a este e-mail, faça login para continuar"
            : e;
        notifyError(error);
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
      } catch (e) {
        notifyError(e);
        throw e;
      }
    },
    async delete() {
      try {
        const { data } = await ContactService.delete(this.contact.id);
        console.log("contact", this.contact);
        this.fetchContacts();
        console.log("contact", this.contact);
        this.contact = {};
      } catch (e) {
        notifyError(e);
        throw e;
      }
    },
  },
});
