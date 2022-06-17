import { Company } from '../../domain/company/company';
import { ICompanyRepository } from '../ICompanyRepository';

export class InMemoryCompanyRepository implements ICompanyRepository {
  private items: Company[];

  constructor() {
    this.items = [];
  }

  async exists(email: string): Promise<boolean> {
    return this.items.some(company => company.email.value === email);
  }

  async findByEmail(email: string): Promise<Company | null> {
    return this.items.find(company => company.email.value === email) || null;
  }

  async update(id: string, company: Company): Promise<void> {
    const companyIndex = this.items.findIndex(
      findCompany => findCompany.id === id,
    );

    this.items[companyIndex] = company;
  }

  async create(company: Company): Promise<void> {
    this.items.push(company);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(company => company.id !== id);
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return this.items.find(company => company.cnpj.value === cnpj) || null;
  }
}
