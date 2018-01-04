import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as fromDynamicForm from "../../../reducers";
import * as textInput from "../../actions/blocks/text-input.actions";
import { TextInputBlock } from "../../models";

@Injectable()
export class TextInputService {
  protected blockSubject: BehaviorSubject<TextInputBlock>;
  readonly blockObservable: Observable<TextInputBlock>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.blockSubject = new BehaviorSubject(undefined);
    this.blockObservable = this.blockSubject.asObservable();
  }

  blockDidChange(block: { id: number, changes: TextInputBlock }): void {
    const newBlock: TextInputBlock = {...block.changes};
    this.blockSubject.next(newBlock);
  }

  protected setBlock(block: {block: {id: number, changes: TextInputBlock}}): void {
    this.store.dispatch(new textInput.ValueDidChange(block));
  }

  setLabel(label: string, block: TextInputBlock): void {
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

  setValue(value: string, block: TextInputBlock): void {
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

  setRequired(required: boolean, block: TextInputBlock): void {
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

  setMinLength(minLength: number, block: TextInputBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          minLength: minLength,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setMaxLength(maxLength: number, block: TextInputBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          maxLength: maxLength,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setDisabled(disabled: boolean, block: TextInputBlock): void {
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
