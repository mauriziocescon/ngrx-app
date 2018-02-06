import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { AppConstantsService } from "../../core/core.module";

import { Block } from "../models";

import * as fromDynamicForm from "../reducers";

@Injectable()
export class BlockListService {

  constructor(protected http: HttpClient,
              protected store: Store<any>,
              protected appConstants: AppConstantsService) {
  }

  getBlocks(module: string, instance: string, step: string): Observable<Block[]> {
    const options = {
      params: {
        module: module,
        instance: instance,
        step: step,
      }
    };

    return this.http
      .get<Block[]>(this.appConstants.Api.blocks, options)
      .map(data => data)
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }

  getValiditySelector(module: string, instance: string, step: string): Observable<boolean> {
    return this.store.select(fromDynamicForm.getAllEditBlocksValidityState);
  }
}
