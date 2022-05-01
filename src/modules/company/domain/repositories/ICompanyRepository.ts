import { Company } from '../entities/Company';

export interface ICreateCompany {
  name: string;
  email: string;
  password: string;
  cnpj: string;
}

export interface ICompanyRepository {
  findByEmail(email: string): Promise<Company | null | undefined>;
  findByCnpj(email: string): Promise<Company | null | undefined>;
  create(data: ICreateCompany): Promise<void>;
  update(id: string, data: Partial<Company>): Promise<void>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  restore(id: string): Promise<void>;
}
