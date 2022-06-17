import { Controller } from '@core/infra/Controller';
import { ValidatorCompositor } from '@infra/validation/Compositor';
import { CompareFieldsValidator } from '@infra/validation/CompareFieldsValidator';
import { CreateCompany } from '@modules/companies/useCases/createCompany/CreateCompany';
import { PrismaCompanyRepository } from '@modules/companies/repositories/prisma/PrismaCompanyRepository';
import { CreateCompanyController } from '@modules/companies/useCases/createCompany/CreateCompanyController';

export function makeCreateCompanyController(): Controller {
  const prismaCompanyRepository = new PrismaCompanyRepository();
  const createCompany = new CreateCompany(prismaCompanyRepository);

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator('password', 'password_confirmation'),
  ]);

  return new CreateCompanyController(validator, createCompany);
}
