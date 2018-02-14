import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { InstanceListService } from "../services";

import {
  InstanceListActionTypes,
  FetchInstancesComplete,
  FetchInstancesError,
} from "../actions/instance-list.actions";

import { Instance } from "../models";

@Injectable()
export class InstanceListEffects {

  constructor(protected actions$: Actions,
              protected instanceList: InstanceListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.actions$
    .ofType(InstanceListActionTypes.FETCH_INSTANCES)
    .debounceTime(400)
    .switchMap(() => {
      return this.instanceList.getInstances()
        .switchMap((instances: Instance[]) => {
          return [new FetchInstancesComplete(instances)];
        })
        .catch(err => of(new FetchInstancesError(err)));
    });
}
