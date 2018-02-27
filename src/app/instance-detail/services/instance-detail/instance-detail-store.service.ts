import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { AppConstantsService } from "../../../core/core.module";

import { Block } from "../../models";

import * as fromInstanceDetail from "../../reducers";

import { IInstanceDetailStore } from "../../tokens";

@Injectable()
export class InstanceDetailStoreService implements IInstanceDetailStore {
  key: string;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected appConstants: AppConstantsService) {
    this.key = this.appConstants.Application.INSTANCE_DETAIL_KEY;
  }

  isSynchronizationRequired(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksValidityState);
  }
}
