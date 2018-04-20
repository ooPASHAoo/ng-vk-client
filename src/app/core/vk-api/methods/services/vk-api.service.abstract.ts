import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {delay, map} from 'rxjs/operators';

import {VkTokenService} from '../../token/services/vk-token.service';
import {AuthVkError} from '../errors/token-error';
import {ApiError} from '../errors/api-error';
import {Stp} from '../../../../shared/supports/safe-type-parser';

@Injectable()
export abstract class VkApiServiceAbstract {

  private readonly BASE_URL = 'https://api.vk.com/method';
  protected abstract METHOD_URL: string;

  constructor(protected _httpClient: HttpClient,
              private _vkTokenService: VkTokenService) {
  }

  public getCurrentUserId(): string|null {
    return this._vkTokenService.getCurrentUserId();
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

    return this._httpClient.jsonp(url, 'callback').pipe(
      // delay(2000),
      map(this._parseBaseResponseData)
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
