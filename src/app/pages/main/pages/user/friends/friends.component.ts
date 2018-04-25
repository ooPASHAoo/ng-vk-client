import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {LoaderServiceDelegate} from '../../../shared/services/abstracts/loader.service.abstract';
import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';
import {FriendsListService} from '../../../shared/services/friends-list.service';


@Component({
  selector: 'pg-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy, LoaderServiceDelegate {

  get usersList(): VkUser[]|null { return this._friendsService.friends; }

  get isLoading(): boolean { return this._friendsService.isLoading(); }

  get hasLoadError(): boolean { return this._friendsService.hasLoadError; }

  get userId(): string { return this._friendsService.userId; }

  get hasUsers(): boolean { return this._friendsService.isData(); }

  private readonly _loadScrollBottom = 3000;


  constructor(private _router: Router,
              private _friendsService: FriendsListService) {}

  ngOnInit() {
    this._friendsService.loaderDelegate = this;
    if (!this.usersList && !this.isLoading && this._friendsService.userId) {
      this._friendsService.refresh();
    }
  }

  ngOnDestroy() {
    this._friendsService.loaderDelegate = null;
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollHeight = document.body.offsetHeight;
    const scrollBottom = window.innerHeight + window.scrollY;
    const scrollLeft = scrollHeight - scrollBottom;
    if (scrollLeft < this._loadScrollBottom) {
      if (!this.isLoading && this._friendsService.userId) {
        this._friendsService.load();
      }
    }
  }

  /** UI-Action */
  onRefresh() {
    this._friendsService.refresh();
  }


  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    if (ownerId) {
      this._friendsService.refresh();
    }
  }

  lsdLoadInterceptor(ownerId: string): boolean { return true; }

  lsdSuccessHandler(newData: number): void {}

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    }
  }

  lsdFinallyHandler(): void {}

}
