import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { AppConstantsService } from "../../core/core.module";

import * as fromCustomBlocks from "../reducers";

@Injectable()
export class CustomBlockListService {

  constructor(protected http: HttpClient,
              protected store: Store<fromCustomBlocks.State>,
              protected appConstants: AppConstantsService) {
  }

  getValiditySelector(): Observable<boolean> {
    return this.store.select(fromCustomBlocks.getAllEditBlocksValidityState);
  }
}
