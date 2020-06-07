import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';

import createConnection from './database/connection';
import routes from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

export default app;
