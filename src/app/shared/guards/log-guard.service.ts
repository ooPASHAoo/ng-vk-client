import {Injectable} from '@angular/core';
import {
  CanLoad, CanActivate, CanActivateChild,
  Router, Route, RouterStateSnapshot, ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {VkTokenService} from '../../core/vk-api/token/services/vk-token.service';

@Injectable()
export class LogGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private _router: Router, private _tokenService: VkTokenService) {
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this._isCan();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this._isCan();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }

  // --- private --- //

  _isCan() {
    if (this._tokenService.isHasActualLocalToken()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
