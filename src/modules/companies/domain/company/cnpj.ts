import { Either, left, right } from '@core/logic/Either';

import { InvalidCnpjError } from './errors/InvalidCnpjError';

export class Cnpj {
  private readonly cnpj: string;

  get value(): string {
    return this.cnpj;
  }

  private constructor(cnpj: string) {
    this.cnpj = cnpj;
  }

  static validate(cnpj: string): boolean {
    if (!cnpj || cnpj.trim().length > 255) {
      return false;
    }

    const regex = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/;

    return regex.test(cnpj);
  }

  static format(cnpj: string) {
    return cnpj.trim().toLowerCase();
  }

  static create(cnpj: string): Either<InvalidCnpjError, Cnpj> {
    if (!this.validate(cnpj)) {
      return left(new InvalidCnpjError(cnpj));
    }

    const formattedCnpj = this.format(cnpj);

    return right(new Cnpj(formattedCnpj));
  }
}
