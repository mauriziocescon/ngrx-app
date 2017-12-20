import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../actions/blocks/check-box.actions";
import { CheckBoxBlock } from "../../models";

@Injectable()
export class CheckBoxService {
  private blockSubject: BehaviorSubject<CheckBoxBlock>;
  readonly blockObservable: Observable<CheckBoxBlock>;

  constructor(private store: Store<fromDynamicForm.State>) {
    this.blockSubject = new BehaviorSubject(undefined);
    this.blockObservable = this.blockSubject.asObservable();
  }

  blockDidChange(block: { id: number, changes: CheckBoxBlock }): void {
    const newBlock: CheckBoxBlock = {...block.changes};
    this.blockSubject.next(newBlock);
  }

  setBlock(block: CheckBoxBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
        },
      }
    };
    this.store.dispatch(new checkBox.ValueDidChange(newBlock));
  }
}
