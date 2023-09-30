import { makeServer } from 'src/api';

if (process.env.MIRAGE_ENABLED === 'true') {
  makeServer();
}
