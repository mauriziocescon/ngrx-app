import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { AppConstantsService } from "../../core/core.module";

import { Block, BlockListService } from "../../dynamic-blocks-list/dynamic-blocks-list.module";

import { fromB1 } from "../../b1";

import { fromB2 } from "../../b2";

import { Modules } from "../models";

@Injectable()
export class CustomBlockListService extends BlockListService {

  constructor(protected http: HttpClient,
              protected route: ActivatedRoute,
              protected store: Store<any>,
              protected appConstants: AppConstantsService) {
    super(
      http,
      route,
      store,
      appConstants,
    );
  }

  getAllEditBlocksSelector(module: string, instance: string, step: string): Observable<Block[]> {
    if (module === Modules.b1) {
      return this.store.select(fromB1.getAllEditBlocksState);
    } else if (module === Modules.b2) {
      return this.store.select(fromB2.getAllEditBlocksState);
    } else {
      super.getAllEditBlocksSelector(module, instance, step);
    }
  }

  getValiditySelector(module: string, instance: string, step: string): Observable<boolean> {
    if (module === Modules.b1) {
      return this.store.select(fromB1.getAllEditBlocksValidityState);
    } else if (module === Modules.b2) {
      return this.store.select(fromB2.getAllEditBlocksValidityState);
    } else {
      super.getValiditySelector(module, instance, step);
    }
  }
}
