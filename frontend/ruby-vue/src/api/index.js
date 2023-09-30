import {
  createServer, Model, Response,
} from 'miragejs';
import { faker } from '@faker-js/faker';

faker.locale = 'pt_BR';

function createRandomUser() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    locale: 'pt-BR',
    geolocation: `${faker.address.cityName()} - ${faker.address.stateAbbr()}`,
    timezone: faker.address.timeZone(),
    token: faker.internet.password(),
  };
}

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
    },

    factories: {
    },

    seeds(sv) {
      sv.create('user', createRandomUser());
    },

    routes() {
      this.namespace = '';
      this.urlPrefix = process.env.VUE_REQUEST_BASE_URL_DEV;
      this.timing = 250;

      this.post('/auth', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const correctEmail = attrs.email === 'marko@dev.com';
        const correctPassword = attrs.password === 'abc@123';
        if (correctEmail && correctPassword) return schema.users.first();
        return new Response(401, { some: 'header' }, { message: 'An account could not be found that matches the username and password entered. Please try again.' });
      });

      this.post('/auth/create', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const correctEmail = attrs.email === 'marko@dev.com';
        const correctPassword = attrs.password === 'abc@123';
        if (correctEmail && correctPassword) return schema.users.first();
        return new Response(401, { some: 'header' }, { message: 'An account could not be found that matches the username and password entered. Please try again.' });
      });
    },
  });

  return server;
}
