import { Company as PersistenceCompany } from '@prisma/client';

import { Email } from '../domain/company/email';
import { Name } from '../domain/company/name';
import { Cnpj } from '../domain/company/cnpj';
import { Password } from '../domain/company/password';
import { Company } from '../domain/company/company';

export class CompanyMapper {
  static toDomain(raw: PersistenceCompany | null): Company | null {
    if (!raw) {
      return null;
    }

    const nameOrError = Name.create(raw.name);
    const emailOrError = Email.create(raw.email);
    const passwordOrError = Password.create(raw.password, true);
    const cnpjOrError = Cnpj.create(raw.cnpj);

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.');
    }

    if (emailOrError.isLeft()) {
      throw new Error('E-mail value is invalid.');
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.');
    }

    if (cnpjOrError.isLeft()) {
      throw new Error('Cnpj value is invalid.');
    }

    const companyOrError = Company.create(
      {
        name: nameOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
        cnpj: cnpjOrError.value,
      },
      raw.id,
    );

    if (companyOrError.isRight()) {
      return companyOrError.value;
    }

    return null;
  }

  static async toPersistence(company: Company) {
    return {
      id: company.id,
      name: company.name.value,
      email: company.email.value,
      password: await company.password.getHashedValue(),
      cnpj: company.cnpj.value,
    };
  }
}
