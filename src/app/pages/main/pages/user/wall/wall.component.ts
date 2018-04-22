import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VkTokenService} from '../../../../../core/vk-api/token/services/vk-token.service';
import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {PostsListService} from '../../../../../core/services/posts-list.service';
import {LoaderServiceDelegate} from '../../../../../core/services/abstracts/loader.service.abstract';
import {VkPostsList} from '../../../../../core/vk-api/methods/models/vk-posts-list.model';

@Component({
  selector: 'pg-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit, OnDestroy, LoaderServiceDelegate {

  get postsList(): VkPostsList|null {
    return this.postsService.postsList;
  }

  isLoading = false;
  hasLoadError = false;

  private readonly _loadScrollBottom = 3000;

  constructor(private _router: Router,
              public postsService: PostsListService) {
  }

  ngOnInit() {
    this.postsService.loaderDelegate = this;
    if (!this.postsService.postsList) {
      this.postsService.load();
    }
  }

  ngOnDestroy(): void {
    this.postsService.loaderDelegate = null;
  }


  // --- actions --- //


  @HostListener('window:scroll')
  onScroll() {
    const scrollHeight = document.body.offsetHeight;
    const scrollBottom = window.innerHeight + window.scrollY;
    const scrollLeft = scrollHeight - scrollBottom;
    if (scrollLeft < this._loadScrollBottom) {
      this.postsService.load();
    }
  }

  onRefresh() {
    this.postsService.refresh();
  }


  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    this.postsService.load();
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
      alert('Ошибка при загрузке записей на стене. Попробуйте еще раз.');
    }
  }

  lsdFinallyHandler(): void {
    this.isLoading = false;
  }

}
