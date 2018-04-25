export enum eApiErrCode {
  UNKNOWN = 1,
  MANY_PER_SECOND = 6,
  ACCESS_DENIED = 15,
  DELETE_OR_BAN = 18,
  INVALID_ID = 113

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
