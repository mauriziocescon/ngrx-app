import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Observable } from "rxjs/Observable";

import { ModalConfirmer, ModalConfirmerResultType, modalConfirmersActions } from "../../../../core/core.module";

import * as checkBoxConfirmer from "../../../actions/blocks/check-box-confirmer.actions";

import { CheckBoxConfirmerBlock } from "../../../models";

import * as fromRoot from "../../../../reducers";
import * as fromB1Blocks from "../../../reducers";

@Injectable()
export class CheckBoxConfirmerStoreService {

  constructor(protected store$: Store<fromRoot.State>) {
  }

  getAllCheckBoxConfirmer(): Observable<CheckBoxConfirmerBlock[]> {
    return this.store$.select(fromB1Blocks.getAllCheckBoxConfirmer);
  }

  getCheckBoxConfirmerBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.select(fromB1Blocks.getCheckBoxConfirmerBlocksLoadingState);
  }

  getModalConfirmerResults(): Observable<{ [id: string]: ModalConfirmerResultType }> {
    return this.store$.select(fromRoot.getModalConfirmerResults);
  }

  dispatchShowModalConfirmer(modalConfirmer: ModalConfirmer): void {
    this.store$.dispatch(new modalConfirmersActions.ShowModalConfirmer({modal: modalConfirmer}));
  }

  dispatchCleanModalConfirmer(payload: { id: string }): void {
    this.store$.dispatch(new modalConfirmersActions.CleanModalConfirmer(payload));
  }

  dispatchUpdateBlock(block: { block: Update<CheckBoxConfirmerBlock>, notify: boolean }): void {
    this.store$.dispatch(new checkBoxConfirmer.UpdateBlock(block));
  }
}
