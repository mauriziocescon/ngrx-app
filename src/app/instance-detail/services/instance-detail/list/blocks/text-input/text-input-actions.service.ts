import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromInstanceDetail from "../../../../../reducers";
import * as textInput from "../../../../../actions/list/blocks/text-input.actions";
import { BlockType, TextInputBlock, TextInputActions } from "../../../../../models";

@Injectable()
export class TextInputActionsService {
  protected blockLoadSubject$: Subject<TextInputBlock>;
  readonly blockLoadObservable$: Observable<TextInputBlock>;

  protected blockChangesSubject$: Subject<TextInputBlock>;
  readonly blockChangesObservable$: Observable<TextInputBlock>;

  constructor(protected store$: Store<fromInstanceDetail.State>) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  getTextInputActions(): TextInputActions {
    return {
      changeLoading: (loading: boolean, blockId: string) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: string) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: string) => this.setValueForBlockId(value, blockId),
      setRequiredForBlockId: (required: boolean, blockId: string) => this.setRequiredForBlockId(required, blockId),
      setMinLengthForBlockId: (minLength: number, blockId: string) => this.setMinLengthForBlockId(minLength, blockId),
      setMaxLengthForBlockId: (maxLength: number, blockId: string) => this.setMaxLengthForBlockId(maxLength, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: string) => this.setDisabledForBlockId(disabled, blockId),
      setValidityForBlockId: (valid: boolean, blockId: string) => this.setValidityForBlockId(valid, blockId),
    };
  }

  blockDidload(block: TextInputBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<TextInputBlock>): void {
    const newBlock = {...block.changes, hooks: {...block.changes.hooks}} as TextInputBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: string): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store$.dispatch(new textInput.Loading(newLoading));
  }

  protected dispatchUpdate(block: Update<TextInputBlock>): void {
    const newBlock = {block: block, notify: false};
    this.store$.dispatch(new textInput.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        label: label,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValueForBlockId(value: string, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        value: value,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        required: required,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setMinLengthForBlockId(minLength: number, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        minLength: minLength,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setMaxLengthForBlockId(maxLength: number, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        maxLength: maxLength,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        disabled: disabled,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: string): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        valid: valid,
      },
    };
    this.dispatchUpdate(newBlock);
  }
}
