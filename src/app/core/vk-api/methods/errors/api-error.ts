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
