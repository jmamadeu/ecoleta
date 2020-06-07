import { createConnection } from 'typeorm';

export default async function connection() {
  return await createConnection()
    .then(() => console.log('Database okay'))
    .catch((err) => console.log('error database', err));
}
