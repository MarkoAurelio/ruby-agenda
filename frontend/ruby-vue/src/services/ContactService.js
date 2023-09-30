import { api } from 'boot/axios';

export default {
  create(contact) {
    return api.post("/contacts", contact);
  },
  getContacts() {
    return api.get("/contacts");
  },
};
