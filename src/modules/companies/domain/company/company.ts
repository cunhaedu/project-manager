import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';

import { InvalidNameError } from './errors/InvalidNameError';
import { InvalidEmailError } from './errors/InvalidEmailError';
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError';
import { InvalidCnpjError } from './errors/InvalidCnpjError';

import { Cnpj } from './cnpj';
import { Password } from './password';
import { Name } from './name';
import { Email } from './email';

interface ICompanyProps {
  name: Name;
  email: Email;
  password: Password;
  cnpj: Cnpj;
}

export class Company extends Entity<ICompanyProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  private constructor(props: ICompanyProps, id?: string) {
    super(props, id);
  }

  static create(
    props: ICompanyProps,
    id?: string,
  ): Either<
    | InvalidNameError
    | InvalidEmailError
    | InvalidPasswordLengthError
    | InvalidCnpjError,
    Company
  > {
    const sender = new Company(props, id);

    return right(sender);
  }
}
