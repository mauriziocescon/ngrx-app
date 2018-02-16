import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { TextInputBlock } from "../../../../../../models";

import * as textInput from "../../../../../../actions/list/blocks/text-input.actions";

import * as fromInstanceDetail from "../../../../../../reducers";

@Injectable()
export class TextInputStoreService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getAllTextInput(): Observable<TextInputBlock[]> {
    return this.store$.select(fromInstanceDetail.getAllTextInput);
  }

  getTextInputBlocksLoading(): Observable<{ [id: string]: boolean }> {
    return this.store$.select(fromInstanceDetail.getTextInputBlocksLoadingState);
  }

  dispatchUpdateBlock(block: { block: { id: number, changes: TextInputBlock }, notify: boolean }): void {
    this.store$.dispatch(new textInput.UpdateBlock(block));
  }
}
