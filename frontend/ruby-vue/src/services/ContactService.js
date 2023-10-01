import { api } from 'boot/axios';

export default {
  createUpdate(contact) {
    if (contact.id) return api.put(`/contacts/${contact.id}`, contact);
    else return api.post("/contacts", contact);
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
};
