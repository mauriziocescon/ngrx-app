import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Observable } from "rxjs/Observable";

import { DropdownBlock } from "../../../../../../models";

import * as dropdown from "../../../../../../actions/list/blocks/dropdown.actions";

import * as fromInstanceDetail from "../../../../../../reducers";

@Injectable()
export class DropdownStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getAllDropdown(): Observable<DropdownBlock[]> {
    return this.store$.select(fromInstanceDetail.getAllDropdown);
  }

  getDropdownBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.select(fromInstanceDetail.getDropdownBlocksLoadingState);
  }

  dispatchUpdateBlock(block: { block: Update<DropdownBlock>, triggerHooks: boolean }): void {
    this.store$.dispatch(new dropdown.UpdateBlock(block));
  }
}
