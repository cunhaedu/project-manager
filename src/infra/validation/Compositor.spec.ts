import { CompareFieldsValidator } from './CompareFieldsValidator';
import { ValidatorCompositor } from './Compositor';
import { RequiredFieldsValidator } from './RequiredFieldsValidator';

describe('Validator Compositor', () => {
  interface RequiredFields {
    field1: string;
    field2: string;
    field3: string;
  }

  const validator = new ValidatorCompositor<RequiredFields>([
    new RequiredFieldsValidator(),
    new CompareFieldsValidator('field2', 'field3'),
  ]);

  const data: RequiredFields = {
    field1: '1234',
    field2: '123456',
    field3: '123456',
  };

  it('Should return no errors if no validators returns one', () => {
    const err = validator.validate(data);
    expect(err?.isRight()).toBeTruthy();
  });

  it('Should return an error if any validator returns one', () => {
    // RequiredFields validation will fail
    const err = validator.validate({
      field2: '123456',
      field3: '123456',
    } as RequiredFields);

    expect(err?.isLeft).toBeTruthy();
  });

  it('Should return an error if any validator returns one', () => {
    // CompareFields validation will fail
    const err = validator.validate({ ...data, field3: '00000' });
    expect(err?.isLeft).toBeTruthy();
  });
});
