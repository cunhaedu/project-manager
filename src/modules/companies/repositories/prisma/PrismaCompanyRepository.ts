import { prisma } from '@infra/prisma/client';

import { Company } from '@modules/companies/domain/company/company';
import { CompanyMapper } from '@modules/companies/mappers/CompanyMapper';
import { ICompanyRepository } from '@modules/companies/repositories/ICompanyRepository';

export class PrismaCompanyRepository implements ICompanyRepository {
  private repository = prisma.company;

  async exists(email: string): Promise<boolean> {
    const companyExists = await prisma.user.findUnique({
      where: { email },
    });

    return !!companyExists;
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.repository.findUnique({
      where: { email },
    });

    return CompanyMapper.toDomain(company);
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    const company = await this.repository.findUnique({
      where: { cnpj },
    });

    return CompanyMapper.toDomain(company);
  }

  async create(company: Company): Promise<void> {
    const data = await CompanyMapper.toPersistence(company);

    await this.repository.create({ data });
  }

  async update(id: string, company: Company): Promise<void> {
    const data = await CompanyMapper.toPersistence(company);

    await this.repository.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
  }
}
