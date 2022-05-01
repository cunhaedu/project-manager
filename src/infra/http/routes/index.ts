import { Router } from 'express';
import { companyRoutes } from './company.routes';

const routes = Router();

routes.use('/companies', companyRoutes);

export { routes };
