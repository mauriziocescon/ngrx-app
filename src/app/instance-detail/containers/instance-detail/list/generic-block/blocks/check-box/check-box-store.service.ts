import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { CheckBoxBlock } from "../../../../../../models";

import * as checkBox from "../../../../../../actions/list/blocks/check-box.actions";

import * as fromInstanceDetail from "../../../../../../reducers";

@Injectable()
export class CheckBoxStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getAllCheckBox(): Observable<CheckBoxBlock[]> {
    return this.store$.select(fromInstanceDetail.getAllCheckBox);
  }

  getCheckBoxBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.select(fromInstanceDetail.getCheckBoxBlocksLoadingState);
  }

  dispatchUpdateBlock(block: { block: { id: number, changes: CheckBoxBlock }, notify: boolean }): void {
    this.store$.dispatch(new checkBox.UpdateBlock(block));
  }
}
