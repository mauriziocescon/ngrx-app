import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs/Observable";

import { ListContainerComponent } from "../containers";

@Injectable()
export class ListGuard implements CanDeactivate<ListContainerComponent> {

  canDeactivate(component: ListContainerComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
