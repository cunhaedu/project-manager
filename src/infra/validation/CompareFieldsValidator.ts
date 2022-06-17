import { Validator } from '@core/infra/Validator';
import { Either, left, right } from '@core/logic/Either';

import { InvalidParamError } from './errors/InvalidParamError';

export class CompareFieldsValidator<T = any> implements Validator<T> {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  public validate(data: T): Either<InvalidParamError, null> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (data[this.field] !== data[this.fieldToCompare]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return left(new InvalidParamError(this.fieldToCompare));
    }

    return right(null);
  }
}
