import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as fromDynamicForm from "../../../reducers";
import * as textInput from "../../actions/blocks/text-input.actions";
import { TextInputBlock } from "../../models";

@Injectable()
export class TextInputService {
  private blockSubject: BehaviorSubject<TextInputBlock>;
  readonly blockObservable: Observable<TextInputBlock>;

  constructor(private store: Store<fromDynamicForm.State>) {
    this.blockSubject = new BehaviorSubject(undefined);
    this.blockObservable = this.blockSubject.asObservable();
  }

  blockDidChange(block: { id: number, changes: TextInputBlock }): void {
    const newBlock: TextInputBlock = {...block.changes};
    this.blockSubject.next(newBlock);
  }

  setBlock(block: TextInputBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
        },
      }
    };
    this.store.dispatch(new textInput.ValueDidChange(newBlock));
  }
}
