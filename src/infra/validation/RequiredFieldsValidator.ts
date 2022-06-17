import { Validator } from '@core/infra/Validator';
import { Either, left, right } from '@core/logic/Either';

import { MissingParamError } from './errors/MissingParamError';

export class RequiredFieldsValidator<T = any> implements Validator<T> {
  public validate(data: T): Either<MissingParamError, null> {
    const fields = Object.getOwnPropertyNames(data);
    // eslint-disable-next-line no-restricted-syntax
    for (const field of fields) {
      if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data[field] === null ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data[field] === undefined ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (typeof data[field] === 'string' && data[field].trim() === '')
      ) {
        return left(new MissingParamError(field));
      }
    }

    return right(null);
  }
}
