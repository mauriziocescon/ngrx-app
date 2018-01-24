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
              protected store: Store<fromDynamicForm.State>,
              protected appConstants: AppConstantsService) {
  }

  getBlocks(): Observable<Block[]> {
    return this.http
      .get<Block[]>(this.appConstants.Api.blocks, {observe: "response"})
      .map(resp => {
        return resp.body;
      })
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }

  getValiditySelector(): Observable<boolean> {
    return this.store.select(fromDynamicForm.getAllEditBlocksValidityState);
  }
}
