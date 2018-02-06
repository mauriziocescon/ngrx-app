import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromDynamicBlocksList from "../../reducers";
import * as checkBox from "../../actions/blocks/check-box.actions";
import { BlockType, CheckBoxBlock, CheckBoxMethods } from "../../models";

@Injectable()
export class CheckBoxService {
  protected blockLoadSubject$: Subject<CheckBoxBlock>;
  readonly blockLoadObservable$: Observable<CheckBoxBlock>;

  protected blockChangesSubject$: Subject<CheckBoxBlock>;
  readonly blockChangesObservable$: Observable<CheckBoxBlock>;

  constructor(protected store: Store<fromDynamicBlocksList.State>) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  getCheckBoxMethods(): CheckBoxMethods {
    return {
      changeLoading: (loading: boolean, blockId: number) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: number) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: boolean, blockId: number) => this.setValueForBlockId(value, blockId),
      setDescriptionForBlockId: (description: string, blockId: number) => this.setDescriptionForBlockId(description, blockId),
      setRequiredForBlockId: (required: boolean, blockId: number) => this.setRequiredForBlockId(required, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: number) => this.setDisabledForBlockId(disabled, blockId),
      setValidityForBlockId: (valid: boolean, blockId: number) => this.setValidityForBlockId(valid, blockId),
    };
  }

  blockDidload(block: CheckBoxBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: { id: number, changes: CheckBoxBlock }): void {
    const newBlock: CheckBoxBlock = {...block.changes, hooks: {...block.changes.hooks}};
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store.dispatch(new checkBox.Loading(newLoading));
  }

  protected setBlock(block: { block: { id: number, changes: CheckBoxBlock } }): void {
    const newBlock = {block: block.block, notify: false};
    this.store.dispatch(new checkBox.UpdateBlock(newBlock));
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

  setValidityForBlockId(valid: boolean, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.CheckBox,
          valid: valid,
        },
      }
    };
    this.setBlock(newBlock);
  }
}
