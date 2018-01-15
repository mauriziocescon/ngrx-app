import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromDynamicForm from "../../../reducers";
import * as textInput from "../../actions/blocks/text-input.actions";
import { BlockType, TextInputBlock } from "../../models";

@Injectable()
export class TextInputService {
  protected blockSubject$: Subject<TextInputBlock>;
  readonly blockObservable$: Observable<TextInputBlock>;

  constructor(protected store: Store<fromDynamicForm.State>) {
    this.blockSubject$ = new Subject();
    this.blockObservable$ = this.blockSubject$.asObservable();
  }

  getTextInputMethods(): any {
    return {
      changeLoading: (loading: boolean, blockId: number) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: number) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: number) => this.setValueForBlockId(value, blockId),
      setRequiredForBlockId: (required: boolean, blockId: number) => this.setRequiredForBlockId(required, blockId),
      setMinLengthForBlockId: (minLength: number, blockId: number) => this.setMinLengthForBlockId(minLength, blockId),
      setMaxLengthForBlockId: (maxLength: number, blockId: number) => this.setMaxLengthForBlockId(maxLength, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: number) => this.setDisabledForBlockId(disabled, blockId),
    };
  }

  blockDidChange(block: { id: number, changes: TextInputBlock }): void {
    const newBlock: TextInputBlock = {...block.changes};
    this.blockSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store.dispatch(new textInput.Loading(newLoading));
  }

  protected setBlock(block: { block: { id: number, changes: TextInputBlock } }): void {
    const newBlock = {block: block.block, notify: false};
    this.store.dispatch(new textInput.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.TextInput,
          label: label,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setValueForBlockId(value: string, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.TextInput,
          value: value,
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
          type: BlockType.TextInput,
          required: required,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setMinLengthForBlockId(minLength: number, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.TextInput,
          minLength: minLength,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setMaxLengthForBlockId(maxLength: number, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.TextInput,
          maxLength: maxLength,
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
          type: BlockType.TextInput,
          disabled: disabled,
        },
      }
    };
    this.setBlock(newBlock);
  }
}
