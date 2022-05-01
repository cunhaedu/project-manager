import { inject, injectable } from 'tsyringe';

import { IEncoderProvider } from '@infra/providers';
import {
  ICompanyRepository,
  ICreateCompany,
} from '@modules/company/domain/repositories/ICompanyRepository';

@injectable()
export class CreateCompany {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,
  ) {}

  public async execute(data: ICreateCompany): Promise<void> {
    const isEmailAlreadyExists = await this.companyRepository.findByEmail(
      data.email,
    );

    if (isEmailAlreadyExists) {
      throw new Error('Email already exists!');
    }

    const isCnpjAlreadyExists = await this.companyRepository.findByCnpj(
      data.cnpj,
    );

    if (isCnpjAlreadyExists) {
      throw new Error('Cnpj already exists!');
    }

    const hashPassword = await this.encoderProvider.encode(data.password);

    await this.companyRepository.create({
      ...data,
      password: hashPassword,
    });
  }
}
