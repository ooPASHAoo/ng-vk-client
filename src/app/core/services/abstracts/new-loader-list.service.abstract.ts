import {Injectable} from '@angular/core';
import {ApiError} from '../../vk-api/methods/errors/api-error';
import {AuthVkError} from '../../vk-api/methods/errors/token-error';
import {Subscription} from 'rxjs/Subscription';
import {StpError} from '../../../shared/supports/safe-type-parser';
import {Observable} from 'rxjs/Observable';

export interface LoaderServiceDelegate {

  lsdChangeOwnerId(ownerId: string): void;

  lsdLoadInterceptor(ownerId: string): boolean;

  lsdSuccessHandler(newData: number): void;

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void;

  lsdFinallyHandler(): void;
}

@Injectable()
export abstract class LoaderListServiceAbstract<T> {

  loaderDelegate?: LoaderServiceDelegate;

  private _ownerId: string;
  private _data?: T;
  private _dataLoader$: Subscription;

  private _offset = 0;
  private _count = 20;
  private _isDataEnd = false;


  // /** Danger method */
  // setOffset(offset: number) {
  //   this._offset = offset;
  //   if (this._postsList) {
  //     this._isPostsEnd = (this._offset >= this._postsList.maxCount);
  //   }
  // }

  // /** Max count = 100 */
  // setCount(count: number) {
  //   this._count = Math.min(count, this._vkWallService.MAX_COUNT);
  // }

  /** if (new ownerId) {reset()} */
  changeOwnerId(ownerId: string) {
    if (this._ownerId !== ownerId) {
      this.cancelLoading();
      this.resetData();
      this._ownerId = ownerId;

      const delegate = this.loaderDelegate;
      if (delegate) {
        delegate.lsdChangeOwnerId.call(delegate, this._ownerId);
      }
    }
  }

  /** cancelLoad+resetData+load */
  refresh() {
    this.cancelLoading();
    this.resetData();
    this.load();
  }

  cancelLoading() {
    if (this._isLoading()) {
      this._dataLoader$.unsubscribe();
    }
  }

  resetData() {
    this._data = null;
    this._offset = 0;
    this._isDataEnd = false;
  }

  load(): boolean {
    if (!this._ownerId) {
      console.warn('LoaderService: need ownerId');
      return false;
    }
    if (this._isLoading()) {
      return false;
    }
    if (this._isDataEnd) {
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


  // --- abstracts --- //

  protected abstract _dataIsEnd(newData: T): boolean;

  protected abstract _dataLoader(): Observable<T>;

  protected abstract _dataLength(data: T): number;

  protected abstract _dataConcat(newData: T): void;


  // --- protected --- //


  protected _isLoading(): boolean {
    if (this._dataLoader$) {
      return !this._dataLoader$.closed;
    }
  }

  protected _responseSuccessHandler(res: T) {
    this._dataConcat(res);
    this._offset += this._dataLength(res);
    this._isDataEnd = this._dataIsEnd(res);

    const delegate = this.loaderDelegate;
    if (delegate) {
      delegate.lsdSuccessHandler.call(delegate, this._dataLength(res));
      delegate.lsdFinallyHandler.call(delegate);
    }
  }

  protected _responseFailureHandler(err: ApiError|AuthVkError|Error) {
    console.warn(`- PG: ${err.name} - ${err.message}`);
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
