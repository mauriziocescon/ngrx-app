import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { ModalAlert, modalAlertsActions } from "../../../../core/core.module";

import * as list from "../../../actions/list/list.actions";

import { Block } from "../../../models";

import * as fromInstanceDetail from "../../../reducers";

@Injectable()
export class NextStepStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getSyncRequired(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredState);
  }

  getSyncRequiredWithTimestamp(): Observable<{ syncRequired: boolean, timestamp: number | undefined }> {
    return this.store$.select(fromInstanceDetail.isSynchronizationRequiredWithTimestampState);
  }

  getUpdateError(): Observable<string | undefined> {
    return this.store$.select(fromInstanceDetail.getUpdateErrorState);
  }

  dispatchShowModalAlert(modalAlert: ModalAlert): void {
    this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
  }

  dispatchUpdateBlock(payload: { module: string, instance: string, step: string, blocks: Block[] }): void {
    this.store$.dispatch(new list.UpdateBlocks(payload));
  }
}
