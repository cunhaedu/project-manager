import { DomainError } from '@core/domain/errors/DomainError';

export class InvalidCnpjError extends Error implements DomainError {
  constructor(cnpj: string) {
    super(`The cnpj "${cnpj}" is invalid.`);
    this.name = 'InvalidCnpjError';
  }
}
