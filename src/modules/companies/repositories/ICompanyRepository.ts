import { Company } from '../domain/company/company';

export interface ICompanyRepository {
  exists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<Company | null>;
  findByCnpj(cnpj: string): Promise<Company | null>;
  create(company: Company): Promise<void>;
  update(id: string, company: Company): Promise<void>;
  delete(id: string): Promise<void>;
}
