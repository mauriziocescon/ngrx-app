import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromB1Blocks from "../../reducers";
import * as checkBoxConfirmer from "../../actions/blocks/check-box-confirmer.actions";
import { B1BlockType, CheckBoxConfirmerBlock, CheckBoxConfirmerMethods } from "../../models";

@Injectable()
export class CheckBoxConfirmerActionsService {
  protected blockLoadSubject$: Subject<CheckBoxConfirmerBlock>;
  readonly blockLoadObservable$: Observable<CheckBoxConfirmerBlock>;

  protected blockChangesSubject$: Subject<CheckBoxConfirmerBlock>;
  readonly blockChangesObservable$: Observable<CheckBoxConfirmerBlock>;

  constructor(protected store$: Store<fromB1Blocks.State>) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  getCheckBoxConfirmerActions(): CheckBoxConfirmerMethods {
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

  blockDidload(block: CheckBoxConfirmerBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<CheckBoxConfirmerBlock>): void {
    const newBlock = {...block.changes, hooks: {...block.changes.hooks}} as CheckBoxConfirmerBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store$.dispatch(new checkBoxConfirmer.Loading(newLoading));
  }

  protected setBlock(block: Update<CheckBoxConfirmerBlock>): void {
    const newBlock = {block: block, notify: false};
    this.store$.dispatch(new checkBoxConfirmer.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: number): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        label: label,
      },
    };
    this.setBlock(newBlock);
  }

  setValueForBlockId(value: boolean, blockId: number): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        value: value,
      },
    };
    this.setBlock(newBlock);
  }

  setDescriptionForBlockId(description: string, blockId: number): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        description: description,
      },
    };
    this.setBlock(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: number): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        required: required,
      },
    };
    this.setBlock(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: number): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        disabled: disabled,
      },
    };
    this.setBlock(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: number): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        valid: valid,
      },
    };
    this.setBlock(newBlock);
  }
}
