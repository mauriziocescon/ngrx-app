import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { InstanceDetailPageComponent } from '../containers';

@Injectable()
export class InstanceDetailGuard implements CanDeactivate<InstanceDetailPageComponent> {

  canDeactivate(component: InstanceDetailPageComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
