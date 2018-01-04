import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as fromDynamicForm from "../../../reducers";
import * as dropdown from "../../actions/blocks/dropdown.actions";
import { DropdownBlock } from "../../models";

@Injectable()
export class DropdownService {
  protected blockSubject: BehaviorSubject<DropdownBlock>;
  readonly blockObservable: Observable<DropdownBlock>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.blockSubject = new BehaviorSubject(undefined);
    this.blockObservable = this.blockSubject.asObservable();
  }

  blockDidChange(block: { id: number, changes: DropdownBlock }): void {
    const newBlock: DropdownBlock = {...block.changes};
    this.blockSubject.next(newBlock);
  }

  protected setBlock(block: {block: {id: number, changes: DropdownBlock}}): void {
    this.store.dispatch(new dropdown.ValueDidChange(block));
  }

  setLabel(label: string, block: DropdownBlock): void {
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

  setValue(value: string, block: DropdownBlock): void {
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

  setChoices(choices: string[], block: DropdownBlock): void {
    const newBlock = {
      block: {
        id: block.id,
        changes: {
          ...block,
          choices: choices,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setRequired(required: boolean, block: DropdownBlock): void {
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

  setDisabled(disabled: boolean, block: DropdownBlock): void {
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
