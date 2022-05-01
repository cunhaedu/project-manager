import { CreateCompanyController } from '@modules/company/useCases/createCompany/CreateCompanyController';
import { Router } from 'express';

const companyRoutes = Router();
const createCompanyController = new CreateCompanyController();

companyRoutes.post('/', createCompanyController.handle);

export { companyRoutes };
