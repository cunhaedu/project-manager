import { Name } from '@modules/companies/domain/company/name';
import { Email } from '@modules/companies/domain/company/email';
import { Password } from '@modules/companies/domain/company/password';
import { Cnpj } from '@modules/companies/domain/company/cnpj';
import { Company } from '@modules/companies/domain/company/company';

type UserOverrides = {
  email?: string;
  password?: string;
  cnpj?: string;
};

export function createCompanyTestFactory(overrides?: UserOverrides) {
  const name = Name.create('John Doe').value as Name;
  const email = Email.create(overrides?.email ?? 'john@doe.com').value as Email;
  const cnpj = Cnpj.create(overrides?.cnpj ?? '96823647000191').value as Cnpj;
  const password = Password.create(overrides?.password ?? '123456')
    .value as Password;

  const company = Company.create({
    name,
    email,
    password,
    cnpj,
  });

  return company.value as Company;
}
//
// export function createAndAuthenticateUser() {
//   const name = Name.create('John Doe').value as Name;
//   const email = Email.create('johndoe@example.com').value as Email;
//   const password = Password.create('johndoe123').value as Password;
//
//   const user = User.create({
//     name,
//     email,
//     password,
//   }).value as User;
//
//   const jwt = JWT.signUser(user);
//
//   return {
//     user,
//     jwt,
//   };
// }
