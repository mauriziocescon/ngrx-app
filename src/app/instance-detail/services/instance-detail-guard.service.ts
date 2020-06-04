import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { InstanceDetailContainerComponent } from '../containers';

@Injectable()
export class InstanceDetailGuard implements CanDeactivate<InstanceDetailContainerComponent> {

  canDeactivate(component: InstanceDetailContainerComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
