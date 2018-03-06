import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import * as checkBoxConfirmer from "../../../actions/blocks/check-box-confirmer.actions";

import { B1BlockType, CheckBoxConfirmerBlock, CheckBoxConfirmerActions } from "../../../models";

import * as fromB1Blocks from "../../../reducers";

@Injectable()
export class B1CheckBoxConfirmerActionsService {

  constructor(protected store$: Store<fromB1Blocks.State>) {
  }

  getCheckBoxConfirmerActions(): CheckBoxConfirmerActions {
    return {
      changeLoading: (loading: boolean, blockId: string) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: string) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: boolean, blockId: string) => this.setValueForBlockId(value, blockId),
      setDescriptionForBlockId: (description: string, blockId: string) => this.setDescriptionForBlockId(description, blockId),
      setRequiredForBlockId: (required: boolean, blockId: string) => this.setRequiredForBlockId(required, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: string) => this.setDisabledForBlockId(disabled, blockId),
      setValidityForBlockId: (valid: boolean, blockId: string) => this.setValidityForBlockId(valid, blockId),
    };
  }

  changeLoading(loading: boolean, blockId: string): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store$.dispatch(new checkBoxConfirmer.Loading(newLoading));
  }

  protected dispatchUpdate(block: Update<CheckBoxConfirmerBlock>): void {
    const newBlock = {block: block, triggerHooks: false};
    this.store$.dispatch(new checkBoxConfirmer.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: string): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        label: label,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValueForBlockId(value: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        value: value,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDescriptionForBlockId(description: string, blockId: string): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        description: description,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        required: required,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        disabled: disabled,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxConfirmerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B1BlockType.CheckBoxConfirmer,
        valid: valid,
      },
    };
    this.dispatchUpdate(newBlock);
  }
}
