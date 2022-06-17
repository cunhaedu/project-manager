import { Validator } from '@core/infra/Validator';
import {
  clientError,
  conflict,
  created,
  HttpResponse,
} from '@core/infra/HttpResponse';
import { CompanyAlreadyExistsError } from '@modules/companies/useCases/createCompany/errors/CompanyAlreadyExistsError';
import { CreateCompany } from './CreateCompany';

type CreateCompanyControllerRequest = {
  name: string;
  email: string;
  password: string;
  cnpj: string;
};

export class CreateCompanyController {
  constructor(
    private readonly validator: Validator<CreateCompanyControllerRequest>,
    private createCompany: CreateCompany,
  ) {}

  async handle(request: CreateCompanyControllerRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request);

      if (validationResult.isLeft()) {
        return clientError(validationResult.value);
      }

      const { name, email, password, cnpj } = request;

      const result = await this.createCompany.execute({
        name,
        email,
        password,
        cnpj,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CompanyAlreadyExistsError:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        return created();
      }
    } catch (error) {
      return fail(error);
    }
  }
}
