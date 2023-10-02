import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import ContactService from '../services/ContactService';
import { filterItems, notifyError, validateCPF } from "../utils/helpers";
import { StateOptions } from "../utils/consts";

export const useContactStore = defineStore("contact", {
  state: () => ({
    contacts: [],
    contact: {},
  }),
  persist: true,
  getters: {
    filteredContacts: (state) => (term) => filterItems(state.contacts, term),
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
        if (!validateCPF(this.contact.cpf)) {
          notifyError("CPF Inválido");
          return false;
        }
        const { data } = await ContactService.createUpdate({
          contact: {
            ...this.contact,
            state: this.contact?.state?.value,
          },
        });
        if (data) this.fetchContacts();
        return true;
      } catch (e) {
        notifyError(e);
        return false;
      } finally {
        Loading.hide();
      }
    },
    async fetchContacts() {
      try {
        Loading.show();
        this.$reset();
        const { data } = await ContactService.getContacts();
        this.contacts = data.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      } catch (e) {
        notifyError(e);
        throw e;
      } finally {
        Loading.hide();
      }
    },
    async fetchContact(contactID) {
      try {
        Loading.show();
        this.contact = {};
        const { data } = await ContactService.getContact(contactID);
        this.contact = data;
        this.contact.state = StateOptions.find((s) => s.value === data.state);
      } catch (e) {
        notifyError(e);
        throw e;
      } finally {
        Loading.hide();
      }
    },
    async delete() {
      try {
        Loading.show();
        const { data } = await ContactService.delete(this.contact.id);
        this.fetchContacts();
        this.clearContact();
      } catch (e) {
        notifyError(e);
        throw e;
      } finally {
        Loading.hide();
      }
    },
    async searchAddress() {
      try {
        Loading.show();
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
      } finally {
        Loading.hide();
      }
    },
    clearContact() {
      this.contact = {};
    },
  },
});
