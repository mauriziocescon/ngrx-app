import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { AppConstantsService } from "../../../core/core.module";

import { BlockListService } from "../../../dynamic-form/dynamic-form.module";

import * as fromB1Blocks from "../reducers";

@Injectable()
export class B1BlockListService extends BlockListService {

  constructor(protected http: HttpClient,
              protected store: Store<any>,
              protected appConstants: AppConstantsService) {
    super(
      http,
      store,
      appConstants,
    );
  }

  getValiditySelector(): Observable<boolean> {
    return this.store.select(fromB1Blocks.getAllEditBlocksValidityState);
  }
}
