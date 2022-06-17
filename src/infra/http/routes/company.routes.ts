import { Router } from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { makeCreateCompanyController } from '@infra/http/factories/controllers/CreateCompanyControllerFactory';

const companyRoutes = Router();

companyRoutes.post('/', adaptRoute(makeCreateCompanyController()));

export { companyRoutes };
