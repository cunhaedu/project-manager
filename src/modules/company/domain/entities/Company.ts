import { DefaultEntity } from '@core/domain/DefaultEntity';
import { generateUUID } from '@core/helpers/generateUUID';

export class Company extends DefaultEntity {
  id: string;

  name: string;

  email: string;

  password: string;

  cnpj: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    super();
    if (!this.id) {
      this.id = generateUUID();
    }
  }
}
