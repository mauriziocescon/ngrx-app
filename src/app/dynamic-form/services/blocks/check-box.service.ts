import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../actions/blocks/check-box.actions";
import { BlockType, CheckBoxBlock } from "../../models";

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

  protected setBlock(block: { block: { id: number, changes: CheckBoxBlock } }): void {
    this.store.dispatch(new checkBox.ValueDidChange(block));
  }

  setLabelForBlockId(label: string, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.CheckBox,
          label: label,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setValueForBlockId(value: boolean, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.CheckBox,
          value: value,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setDescriptionForBlockId(description: string, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.CheckBox,
          description: description,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.CheckBox,
          required: required,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.CheckBox,
          disabled: disabled,
        },
      }
    };
    this.setBlock(newBlock);
  }
}
