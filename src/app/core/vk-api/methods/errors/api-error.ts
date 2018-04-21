export enum eApiErrCode {
  UNKNOWN = 1,
  MANY_PER_SECOND = 6,
}

export class ApiError extends Error {

  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = 'ApiError';

    // Для работы instanceof
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// коды ошибок - https://vk.com/dev/errors
