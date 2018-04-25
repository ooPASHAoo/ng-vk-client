import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {delay, delayWhen, map, retryWhen} from 'rxjs/operators';
import {timer} from 'rxjs/observable/timer';

import {VkTokenService} from '../../token/services/vk-token.service';
import {AuthVkError} from '../errors/token-error';
import {ApiError, eApiErrCode} from '../errors/api-error';
import {createError} from '@angular/core/src/render3/instructions';

@Injectable()
export abstract class VkApiServiceAbstract {

  private readonly BASE_URL = 'https://api.vk.com/method';
  protected abstract METHOD_URL: string;

  constructor(protected _httpClient: HttpClient,
              private _vkTokenService: VkTokenService) {
  }

  protected getDefaultParams(): HttpParams {
    return new HttpParams()
      .set('v', '5.74');
  }

  protected httpJsonpGet(httpParams: HttpParams = this.getDefaultParams()): Observable<object|Array<object>> {
    const token = this._vkTokenService.getActualLocalToken();
    if (!token) {
      return new Observable((observer) => {
        observer.error(new AuthVkError());
        observer.complete();
      });
    }

    const params = httpParams.set('access_token', token.token);
    const url = this._requestUrl(params);
    const callbackParamName = 'callback'; // This param key. Value auto-generate

    console.log('- PG:',
      params.get('user_id') ? params.get('user_id') : params.get('owner_id'),
      this.METHOD_URL);

    return this._httpClient.jsonp(url, callbackParamName).pipe(
      delay(Math.random() * 1000),
      map(this._parseBaseResponseData),
      retryWhen(this._errorBaseRetryHandler)
    );
  }

  private _errorBaseRetryHandler(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      delayWhen(err => {
        if (err instanceof ApiError) {
          if (err.code === eApiErrCode.MANY_PER_SECOND) {
            console.warn('VkApi: Слишком много запросов в секунду, повтор через 1 секунду.');
            return timer(1000);
          }
        }
        throw err;
      })
    );
  }

  private _parseBaseResponseData(res: object): object {
    const err = res['error'];
    if (err) {
      throw new ApiError(err['error_code'], err['error_msg']);
    }
    return res['response'];
  }

  private _requestUrl(httpParams: HttpParams): string {
    return `${this.BASE_URL}/${this.METHOD_URL}?${httpParams.toString()}`;
  }

}
