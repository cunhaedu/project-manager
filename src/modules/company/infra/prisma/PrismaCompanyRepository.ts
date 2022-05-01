import { prisma } from '@infra/prisma/client';
import { injectable } from 'tsyringe';

import {
  ICompanyRepository,
  ICreateCompany,
} from '@modules/company/domain/repositories/ICompanyRepository';
import { Company } from '@modules/company/domain/entities/Company';

@injectable()
export class PrismaCompanyRepository implements ICompanyRepository {
  private repository = prisma.company;

  async findByEmail(email: string): Promise<Company | null | undefined> {
    return this.repository.findUnique({
      where: { email },
    });
  }

  async findByCnpj(cnpj: string): Promise<Company | null | undefined> {
    return this.repository.findUnique({
      where: { cnpj },
    });
  }

  async create({ password, name, email, cnpj }: ICreateCompany): Promise<void> {
    const company = new Company();

    Object.assign(company, {
      password,
      name,
      email,
      cnpj,
    });

    await this.repository.create({
      data: company,
    });
  }

  async update(id: string, data: Partial<Company>): Promise<void> {
    await this.repository.update({
      data,
      where: { id },
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
  }

  async restore(id: string): Promise<void> {
    await this.repository.update({
      where: { id },
      data: { deleted_at: null },
    });
  }
}
