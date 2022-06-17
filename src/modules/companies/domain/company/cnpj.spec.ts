import { Cnpj } from './cnpj';

describe('Company cnpj value object', () => {
  it('should accept valid cnpj', () => {
    const emailOrError = Cnpj.create('96823647000192');

    expect(emailOrError.isRight()).toBeTruthy();
  });

  it('should reject invalid cnpj', () => {
    const emailOrError1 = Cnpj.create('96823647000');

    expect(emailOrError1.isLeft()).toBeTruthy();
  });
});
