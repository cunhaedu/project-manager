import { UseCaseError } from '@core/domain/errors/UseCaseError';

export class CompanyAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`Company already exists!`);
    this.name = 'CompanyAlreadyExistsError';
  }
}
