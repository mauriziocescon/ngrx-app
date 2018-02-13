import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { HomeService } from "../services";

import {
  HomeActionTypes,
  FetchInstancesComplete,
  FetchInstancesError,
} from "../actions/home.actions";

import { Instance } from "../models";

@Injectable()
export class HomeEffects {

  constructor(protected actions$: Actions,
              protected homeService: HomeService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .ofType(HomeActionTypes.FETCH_INSTANCES)
    .debounceTime(400)
    .switchMap(() => {
      return this.homeService.getInstances()
        .switchMap((instances: Instance[]) => {
          return [new FetchInstancesComplete(instances)];
        })
        .catch(err => of(new FetchInstancesError(err)));
    });
}
