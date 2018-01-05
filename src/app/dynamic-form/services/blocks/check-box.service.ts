import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../actions/blocks/check-box.actions";
import { CheckBoxBlock } from "../../models";

@Injectable()
export class CheckBoxService {
  protected blockSubject: Subject<CheckBoxBlock>;
  readonly blockObservable: Observable<CheckBoxBlock>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.blockSubject = new Subject();
    this.blockObservable = this.blockSubject.asObservable();
  }

  blockDidChange(block: { id: number, changes: CheckBoxBlock }): void {
    const newBlock: CheckBoxBlock = {...block.changes};
    this.blockSubject.next(newBlock);
  }

  protected setBlock(block: {block: {id: number, changes: CheckBoxBlock}}): void {
    this.store.dispatch(new checkBox.ValueDidChange(block));
  }

  setLabel(label: string, block: CheckBoxBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          label: label,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setValue(value: boolean, block: CheckBoxBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          value: value,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setDescription(description: string, block: CheckBoxBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          description: description,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setRequired(required: boolean, block: CheckBoxBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          required: required,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setDisabled(disabled: boolean, block: CheckBoxBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          disabled: disabled,
        },
      }
    };
    this.setBlock(newBlock);
  }
}
