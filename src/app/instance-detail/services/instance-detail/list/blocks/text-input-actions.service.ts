import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromInstanceDetail from "../../../../reducers";
import * as textInput from "../../../../actions/list/blocks/text-input.actions";
import { BlockType, TextInputBlock, TextInputMethods } from "../../../../models";

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

  getTextInputActions(): TextInputMethods {
    return {
      changeLoading: (loading: boolean, blockId: number) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: number) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: number) => this.setValueForBlockId(value, blockId),
      setRequiredForBlockId: (required: boolean, blockId: number) => this.setRequiredForBlockId(required, blockId),
      setMinLengthForBlockId: (minLength: number, blockId: number) => this.setMinLengthForBlockId(minLength, blockId),
      setMaxLengthForBlockId: (maxLength: number, blockId: number) => this.setMaxLengthForBlockId(maxLength, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: number) => this.setDisabledForBlockId(disabled, blockId),
      setValidityForBlockId: (valid: boolean, blockId: number) => this.setValidityForBlockId(valid, blockId),
    };
  }

  blockDidload(block: TextInputBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<TextInputBlock>): void {
    const newBlock = {...block.changes, hooks: {...block.changes.hooks}} as TextInputBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store$.dispatch(new textInput.Loading(newLoading));
  }

  protected setBlock(block: Update<TextInputBlock>): void {
    const newBlock = {block: block, notify: false};
    this.store$.dispatch(new textInput.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        label: label,
      },
    };
    this.setBlock(newBlock);
  }

  setValueForBlockId(value: string, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        value: value,
      },
    };
    this.setBlock(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        required: required,
      },
    };
    this.setBlock(newBlock);
  }

  setMinLengthForBlockId(minLength: number, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        minLength: minLength,
      },
    };
    this.setBlock(newBlock);
  }

  setMaxLengthForBlockId(maxLength: number, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        maxLength: maxLength,
      },
    };
    this.setBlock(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        disabled: disabled,
      },
    };
    this.setBlock(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: number): void {
    const newBlock: Update<TextInputBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.TextInput,
        valid: valid,
      },
    };
    this.setBlock(newBlock);
  }
}
