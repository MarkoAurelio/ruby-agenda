import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import ContactService from '../services/ContactService';
import { filterItems, notifyError } from '../utils/helpers';

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [],
  }),
  persist: true,
  getters: {
    filteredContacts: (state) => (term) => filterItems(state.contacts, term, 'name'),
  },
  actions: {
    async create(newContact) {
      try {
        Loading.show();
        const { contact } = (await ContactService.create(newContact)).data;

        this.contacts.push({ email: contact.email, name: contact.name });
      } catch (e) {
        const error = e.response?.status === 401 ? 'Já existe uma conta associada a este e-mail, faça login para continuar' : e;
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
  },
});
