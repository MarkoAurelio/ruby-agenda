import { api } from 'boot/axios';

export default {
  create(contact) {
    return api.post('/contact/create', contact);
  },
  getContacts() {
    const result = {
      data: [
        {
          id: 1,
          name: 'Tio Joao',
          cpf: '009.610.339-67',
        },
        {
          id: 2,
          name: 'Andre',
          cpf: '123.345.654-56',
        },
        {
          id: 3,
          name: 'Pedro',
          cpf: '236.435.347-78',
        },
      ],
    };
    // return api.get('/contact');
    return result;
  },
};
