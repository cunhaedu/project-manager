import { ICompanyRepository } from '@modules/companies/repositories/ICompanyRepository';
import { CreateCompany } from '@modules/companies/useCases/createCompany/CreateCompany';
import { InMemoryCompanyRepository } from '@modules/companies/repositories/in-memory/InMemoryCompanyRepository';
import { CompanyAlreadyExistsError } from '@modules/companies/useCases/createCompany/errors/CompanyAlreadyExistsError';
import { createCompanyTestFactory } from '@test/factories/CompanyFactory';

describe('Register User', () => {
  let companyRepository: ICompanyRepository;
  let createCompany: CreateCompany;

  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository();
    createCompany = new CreateCompany(companyRepository);
  });

  it('should be able to register new company', async () => {
    const response = await createCompany.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      cnpj: '96823647000192',
    });

    expect(await companyRepository.exists('john@doe.com')).toBeTruthy();
    expect(response.isRight()).toBeTruthy();
  });

  it('should not be able to register new company with invalid data', async () => {
    const response = await createCompany.execute({
      name: 'John Doe',
      email: 'john',
      password: '123',
      cnpj: '96823647',
    });

    expect(response.isLeft()).toBeTruthy();
  });

  it('should not be able to register new company with existing email', async () => {
    const user = createCompanyTestFactory({
      email: 'john@doe.com',
    });

    await companyRepository.create(user);

    const response = await createCompany.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      cnpj: '96823647000192',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new CompanyAlreadyExistsError());
  });

  it('should not be able to register new company with existing cnpj', async () => {
    const user = createCompanyTestFactory({
      cnpj: '96823647000192',
    });

    await companyRepository.create(user);

    const response = await createCompany.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      cnpj: '96823647000192',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toEqual(new CompanyAlreadyExistsError());
  });
});
