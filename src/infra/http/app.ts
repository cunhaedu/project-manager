import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv-flow';

import { errorsHandler } from '@core/domain/errors/handlers/ErrorsHandler';
import { routes } from './routes';

config({ silent: true });

const app = express();

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  }),
);

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
);

app.use(routes);
app.use(errorsHandler);

export { app };
