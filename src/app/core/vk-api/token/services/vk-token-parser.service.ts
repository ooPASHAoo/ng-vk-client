import {Injectable} from '@angular/core';

import {VkTokenModel} from '../models/vk-token.model';

@Injectable()
export class VkTokenParserService {

  parseHash(hash: string): Promise<VkTokenModel> {
    const hashObj = this._parseHashToObj(hash);

    if (this._isErrorObj(hashObj)) {
      return this._errorFromObj(hashObj);
    } else {
      return this._tokenModelFromObj(hashObj);
    }
  }

  // --- private --- //

  private _parseHashToObj(hash: string): object {
    const params = {};
    hash.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
    return params;
  }

  private _isErrorObj(hashObj: object): boolean {
    return !!hashObj['error'];
  }

  private _errorFromObj(errorObj: object): Promise<VkTokenModel> {
    return new Promise((resolve, reject) => {

      const title: string = errorObj['error'];
      const reason: string = errorObj['error_reason'];
      const description: string = errorObj['error_description'];

      const error = new Error();
      error.name = title;
      error.message = reason + ' : ' + description;

      reject(error);
    });
  }

  private _tokenModelFromObj(tokenObj: object): Promise<VkTokenModel> {
    return new Promise((resolve, reject) => {

      const token: string = tokenObj['access_token'];
      const expires: string = tokenObj['expires_in'];
      const userId: string = tokenObj['user_id'];

      if (!token || !expires || !userId) {
        reject(new Error(`Token parse is empty: tokenObj=${tokenObj}`));
        return;
      }

      const expiresNum = parseInt(expires, 10);
      if (isNaN(expiresNum)) {
        reject(new Error(`Token parse is NaN: tokenObj=${tokenObj}`));
        return;
      }

      const currentDate = new Date();
      const expiresDate = new Date(currentDate.getTime() + expiresNum);

      const tokenModel = new VkTokenModel(token, expiresDate, userId);
      resolve(tokenModel);
    });
  }
}

// error=access_denied&
// error_reason=user_denied&
// error_description=User%20denied%20your%20request

// http://localhost:4200/login/oauth-callback#
// access_token=988ee8a762e02cf74dbb2477273ae24cdf98604914c74088c9b100b98c9c9c74904b2a5debe74f97629af&
// expires_in=86400&
// user_id=9096372
