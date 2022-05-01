import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompany } from './CreateCompany';

export class CreateCompanyController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, cnpj } = req.body;

      const createUserUseCase = container.resolve(CreateCompany);

      const user = await createUserUseCase.execute({
        name,
        email,
        password,
        cnpj,
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
