import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { ModalAlert, modalAlertsActions } from "../../../../core/core.module";

import { Block } from "../../../models";

import * as list from "../../../actions/list/list.actions";

import * as fromInstanceDetail from "../../../reducers";

@Injectable()
export class ListStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getFetchedBlocks(): Observable<Block[] | undefined> {
    return this.store$.select(fromInstanceDetail.getFetchedBlocksState);
  }

  getFetchLoading(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.getFetchLoadingState);
  }

  getFetchError(): Observable<string | undefined> {
    return this.store$.select(fromInstanceDetail.getFetchErrorState);
  }

  dispatchShowModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
  }

  dispatchFetchBlocks(module: string, instance: string, step: string): void {
    this.store$.dispatch(new list.FetchBlocks({module: module, instance: instance, step: step}));
  }

  dispatchClearBlocks(): void {
    this.store$.dispatch(new list.ClearBlocks());
  }
}
