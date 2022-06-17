import { Either, left, right } from '@core/logic/Either';

import { ICompanyRepository } from '@modules/companies/repositories/ICompanyRepository';
import { InvalidNameError } from '@modules/companies/domain/company/errors/InvalidNameError';
import { InvalidEmailError } from '@modules/companies/domain/company/errors/InvalidEmailError';
import { InvalidPasswordLengthError } from '@modules/companies/domain/company/errors/InvalidPasswordLengthError';
import { InvalidCnpjError } from '@modules/companies/domain/company/errors/InvalidCnpjError';
import { Company } from '@modules/companies/domain/company/company';
import { Name } from '@modules/companies/domain/company/name';
import { Email } from '@modules/companies/domain/company/email';
import { Password } from '@modules/companies/domain/company/password';
import { Cnpj } from '@modules/companies/domain/company/cnpj';
import { CompanyAlreadyExistsError } from '@modules/companies/useCases/createCompany/errors/CompanyAlreadyExistsError';

type CreateCompanyRequest = {
  name: string;
  email: string;
  password: string;
  cnpj: string;
};

type CreateCompanyResponse = Either<
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordLengthError
  | InvalidCnpjError
  | CompanyAlreadyExistsError,
  Company
>;

export class CreateCompany {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({
    name,
    password,
    cnpj,
    email,
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);
    const cnpjOrError = Cnpj.create(cnpj);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    if (cnpjOrError.isLeft()) {
      return left(cnpjOrError.value);
    }

    const isEmailAlreadyExists = await this.companyRepository.findByEmail(
      email,
    );

    if (isEmailAlreadyExists) {
      return left(new CompanyAlreadyExistsError());
    }

    const isCnpjAlreadyExists = await this.companyRepository.findByCnpj(cnpj);

    if (isCnpjAlreadyExists) {
      return left(new CompanyAlreadyExistsError());
    }

    const companyOrError = Company.create({
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      cnpj: cnpjOrError.value,
    });

    if (companyOrError.isLeft()) {
      return left(companyOrError.value);
    }

    const company = companyOrError.value;

    await this.companyRepository.create(company);

    return right(company);
  }
}
