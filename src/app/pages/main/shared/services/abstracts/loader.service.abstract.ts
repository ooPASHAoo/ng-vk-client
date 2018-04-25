import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {StpError} from '../../../../../shared/supports/safe-type-parser';


export interface LoaderServiceDelegate {

  lsdChangeOwnerId(ownerId: string): void;
  lsdLoadInterceptor(ownerId: string): boolean;
  lsdSuccessHandler(newData: number): void;
  lsdFailureHandler(err: ApiError|AuthVkError|Error): void;
  lsdFinallyHandler(): void;
}


@Injectable()
export abstract class LoaderServiceAbstract<T> {

  get userId(): string { return this._ownerId; }

  get hasLoadError(): boolean { return this._hasLoadError; }

  loaderDelegate?: LoaderServiceDelegate;

  protected _ownerId: string;
  protected _data: T|null;
  private _dataLoader$: Subscription;
  private _hasLoadError = false;

  // resetWithNewOwnerId(ownerId: string) {
  //   this.cancelLoading();
  //   this.resetData();
  //   this.changeOwnerId(ownerId);
  // }

  reset() {
    this.cancelLoading();
    this.resetData();
    this.changeOwnerId(null);
  }

  changeOwnerId(ownerId: string): boolean {
    if (this._ownerId === ownerId) {
      return false;
    }

    this._ownerId = ownerId;
    const delegate = this.loaderDelegate;
    if (delegate) {
      delegate.lsdChangeOwnerId.call(delegate, this._ownerId);
    }
    return true;
  }

  /** cancelLoad+resetData+load */
  refresh() {
    this.cancelLoading();
    this.resetData();
    this.load();
  }

  cancelLoading() {
    if (this.isLoading()) {
      this._dataLoader$.unsubscribe();
    }
  }

  resetData() {
    this._hasLoadError = false;
    this._data = null;
  }

  isLoading(): boolean {
    if (this._dataLoader$) {
      return !this._dataLoader$.closed;
    }
  }

  load(): boolean {
    if (!this._ownerId) {
      console.warn('LoaderService: need ownerId');
      console.log('- PG:', 'component name', this.loaderDelegate['compName']);
      return false;
    }
    if (this.isLoading()) {
      return false;
    }

    const delegate = this.loaderDelegate;
    if (delegate) {
      if (!delegate.lsdLoadInterceptor.call(delegate, this._ownerId)) {
        return false;
      }
    }

    this._dataLoader$ = this._dataLoader()
      .subscribe(
        this._responseSuccessHandler.bind(this),
        this._responseFailureHandler.bind(this)
      );

    return true;
  }


  // --- abstract --- //


  protected abstract _dataLoader(): Observable<T>;

  protected abstract _dataLength(data: T): number;

  protected abstract _dataConcat(newData: T): void;


  // --- protected --- //


  protected _responseSuccessHandler(res: T) {
    this._hasLoadError = false;

    this._dataConcat(res);

    const delegate = this.loaderDelegate;
    if (delegate) {
      delegate.lsdSuccessHandler.call(delegate, this._dataLength(res));
      delegate.lsdFinallyHandler.call(delegate);
    }
  }

  protected _responseFailureHandler(err: ApiError|AuthVkError|Error) {
    this._hasLoadError = true;

    console.warn(`- PG: (${err['code']}) ${err.name} - ${err.message}`);
    if (err instanceof StpError) {
      console.dir(err.parseObject);
    }

    const delegate = this.loaderDelegate;
    if (delegate) {
      delegate.lsdFailureHandler.call(delegate, err);
      delegate.lsdFinallyHandler.call(delegate);
    }
  }

}
