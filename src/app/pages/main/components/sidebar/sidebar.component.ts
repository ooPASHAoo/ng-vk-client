import {Component, HostListener, OnInit} from '@angular/core';

import {VkCurrentUserService} from '../../../../core/vk-api/methods/services/vk-current-user.service';


@Component({
  selector: 'pg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private _maxTopOffset = 200;

  userId: string;
  isShowUpBtn = false;


  @HostListener('window:scroll')
  onScroll() {
    this.isShowUpBtn = (window.scrollY > this._maxTopOffset);
  }

  constructor(private _currentUser: VkCurrentUserService) {}

  ngOnInit() {
    this.userId = this._currentUser.getId();
    if (!this.userId) {
      console.warn('PG|SidebarComponent: current user id is empty.');
    }
  }

  /** скролит за линейное время, если не мешать */
  goToTop() {
    if (!this.isShowUpBtn) {
      return;
    }

    const duration = 500;
    const fps = 20; // 60 fps view has freeze
    //
    const spf = 1000 / fps;
    const stepCount = duration / spf;
    const step = window.scrollY / stepCount;

    // Если мешать скроллу, он будет кратно ускоряться
    let userResistance = 1;
    let previousOffset: number;

    const scrollToTop$ = window.setInterval(() => {
      const currentOffset = window.scrollY;

      if (previousOffset !== undefined && previousOffset < currentOffset) {
        userResistance += 0.1; // т.к. 60fps то это много
      } else {
        previousOffset = currentOffset;
      }

      if (currentOffset > 0) {
        window.scrollTo(0, currentOffset - (step * userResistance));
      } else {
        window.clearInterval(scrollToTop$);
      }
    }, spf);
  }

}
