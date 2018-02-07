import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { AppConstantsService } from "../../core/core.module";

import { Block } from "../models";

import * as fromDynamicBlocksList from "../reducers";

@Injectable()
export class BlockListService {

  constructor(protected http: HttpClient,
              protected route: ActivatedRoute,
              protected store: Store<fromDynamicBlocksList.State>,
              protected appConstants: AppConstantsService) {
  }

  getBlocks(module: string, instance: string, step: string): Observable<Block[]> {
    const options = {
      params: {
        module: module,
        instance: instance,
        step: step,
      },
    };

    return this.http
      .get<Block[]>(this.appConstants.Api.blocks, options)
      .map(data => data)
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }

  updateBlocks(module: string, instance: string, step: string, blocks: Block[]): Observable<boolean> {
    const body = {
      module: module,
      instance: instance,
      step: step,
      blocks: blocks,
    };

    return this.http
      .post<Block[]>(this.appConstants.Api.blocks, body)
      .map(data => data)
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }

  getUpdateBlocksInstanceSelector(): { module: string, instance: string, step: string } {
    const module = this.route.snapshot.paramMap.get("module");
    const instance = this.route.snapshot.paramMap.get("instance");
    const step = this.route.snapshot.paramMap.get("step");

    return {
      module: module,
      instance: instance,
      step: step,
    };
  }

  getAllEditBlocksSelector(module: string, instance: string, step: string): Observable<Block[]> {
    return this.store.select(fromDynamicBlocksList.getAllEditBlocksState);
  }

  getValiditySelector(module: string, instance: string, step: string): Observable<boolean> {
    return this.store.select(fromDynamicBlocksList.getAllEditBlocksValidityState);
  }
}
