import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {LoaderServiceDelegate} from '../../../../../core/services/abstracts/loader.service.abstract';
import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';
import {FriendsListService} from '../../../../../core/services/friends-list.service';

@Component({
  selector: 'pg-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy, LoaderServiceDelegate {

  get usersList(): VkUser[]|null {
    const usersList = this.friendsService.friends;
    console.log('- PG:', usersList);
    return usersList;
  }

  isLoading = false;
  hasLoadError = false;

  private readonly _loadScrollBottom = 3000;

  constructor(private _router: Router,
              public friendsService: FriendsListService) {
  }

  ngOnInit() {
    this.friendsService.loaderDelegate = this;
    if (!this.friendsService.friends) {
      this.friendsService.refresh();
    }
  }

  ngOnDestroy() {
    this.friendsService.loaderDelegate = null;
  }


  // --- actions --- //


  @HostListener('window:scroll')
  onScroll() {
    const scrollHeight = document.body.offsetHeight;
    const scrollBottom = window.innerHeight + window.scrollY;
    const scrollLeft = scrollHeight - scrollBottom;
    if (scrollLeft < this._loadScrollBottom) {
      this.friendsService.load();
    }
  }

  onRefresh() {
    this.friendsService.refresh();
  }


  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    this.friendsService.load();
  }

  lsdLoadInterceptor(ownerId: string): boolean {
    this.isLoading = true;
    return true;
  }

  lsdSuccessHandler(newData: number): void {
    this.hasLoadError = false;
  }

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    this.hasLoadError = true;

    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      alert('Ошибка при загрузке списка друзей. Попробуйте еще раз.');
    }
  }

  lsdFinallyHandler(): void {
    this.isLoading = false;
  }

}
