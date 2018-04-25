export class AuthVkError extends Error {

  userDescription = 'Время авторизации истекло, необходимо повторить авторизацию.';
  loginRoute = '/login';

  constructor(message: string = 'Ошибка авторизации') {
    super(message);
    this.name = 'AuthVkError';

    // Для работы instanceof
    Object.setPrototypeOf(this, AuthVkError.prototype);
  }

}
