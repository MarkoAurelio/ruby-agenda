import { api } from 'boot/axios';

export default {
  createUpdate(payload) {
    if (payload.contact.id)
      return api.put(`/contacts/${payload.contact.id}`, payload);
    else return api.post("/contacts", payload);
  },
  getContacts() {
    return api.get("/contacts");
  },
  getContact(id) {
    return api.get(`/contacts/${id}`);
  },
  delete(id) {
    return api.delete(`/contacts/${id}`);
  },
  fetchAddress(cep) {
    return api.get(`/contacts/search_address/${cep}`);
  },
};
