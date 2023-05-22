import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { KeyStorage } from '../enums/storage.enums';

@Injectable()
export class checkLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user_id: any = localStorage.getItem(KeyStorage.user_id);
    if (user_id === null) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
