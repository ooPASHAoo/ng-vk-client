import {Injectable} from '@angular/core';

import {LoaderServiceAbstract} from './loader.service.abstract';


@Injectable()
export abstract class LoaderListServiceAbstract<T> extends LoaderServiceAbstract<T> {

  protected _offset = 0;
  protected _count = 20;
  protected _isDataEnd = false;


  /** Danger method */
  setOffset(offset: number) {
    this._offset = offset;
  }

  /** Danger method */
  protected _setCount(count: number) {
    this._count = count;
  }


  // --- abstracts --- //


  /** _data is old (before .concat) */
  protected abstract _dataIsEnd(newData: T): boolean;


  // --- override LoaderServiceAbstract --- //


  /** @override */
  resetData() {
    super.resetData();
    this._offset = 0;
    this._isDataEnd = false;
  }

  /** @override */
  load(): boolean {
    if (this._isDataEnd) {
      return false;
    }
    return super.load();
  }

  /** @override */
  protected _responseSuccessHandler(res: T) {
    this._offset += this._dataLength(res);
    if (this._dataLength(res) < this._count) {
      this._isDataEnd = true;
    } else {
      this._isDataEnd = this._dataIsEnd(res);
    }
    super._responseSuccessHandler(res);
  }

}
