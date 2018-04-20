import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VkGroup} from '../../../../../core/vk-api/methods/models/vk-group.model';
import {VkApiGroupsService} from '../../../../../core/vk-api/methods/services/vk-api-groups.service';
import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {StpError} from '../../../../../shared/supports/safe-type-parser';

@Component({
  selector: 'pg-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  userId: string;

  groupsList: VkGroup[];
  isLoaded = false;
  hasLoadError = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _vkApiGroups: VkApiGroupsService,
              private _router: Router) {
  }

  ngOnInit() {
    this._activatedRoute.parent.paramMap
      .subscribe((paramMap) => {
        this.userId = paramMap.get('id');
        this._refresh();
      });
  }

  // --- actions --- //

  onRefresh() {
    this._refresh();
  }

  // --- private --- //

  private _refresh() {
    this._loadGroupList(this.userId);
  }

  private _loadGroupList(userId: string) {
    this.isLoaded = false;
    this.hasLoadError = false;

    this._vkApiGroups.getByUserId(userId)
      .subscribe(
        this._responseSuccessHandler.bind(this),
        this._responseFailureHandler.bind(this)
      );
  }

  private _responseSuccessHandler(res: VkGroup[]) {
    this.isLoaded = true;
    this.groupsList = res;
  }

  private _responseFailureHandler(err: ApiError|AuthVkError|Error) {
    console.warn(`- PG: ${err.name} - ${err.message}`);
    if (err instanceof StpError) {
      console.dir(err.parseObject);
    }

    this.hasLoadError = true;

    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      alert('Ошибка при загрузке списка групп. Попробуйте еще раз.');
    }

    this.isLoaded = true;
  }

}
