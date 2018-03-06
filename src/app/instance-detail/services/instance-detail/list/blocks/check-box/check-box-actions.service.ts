import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import * as checkBox from "../../../../../actions/list/blocks/check-box.actions";

import { BlockType, CheckBoxBlock, CheckBoxActions } from "../../../../../models";

import * as fromInstanceDetail from "../../../../../reducers";

@Injectable()
export class CheckBoxActionsService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getCheckBoxActions(): CheckBoxActions {
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
    this.store$.dispatch(new checkBox.Loading(newLoading));
  }

  protected dispatchUpdate(block: Update<CheckBoxBlock>): void {
    const newBlock = {block: block, triggerHooks: false};
    this.store$.dispatch(new checkBox.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: string): void {
    const newBlock: Update<CheckBoxBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.CheckBox,
        label: label,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValueForBlockId(value: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.CheckBox,
        value: value,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDescriptionForBlockId(description: string, blockId: string): void {
    const newBlock: Update<CheckBoxBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.CheckBox,
        description: description,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxBlock>= {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.CheckBox,
        required: required,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.CheckBox,
        disabled: disabled,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: string): void {
    const newBlock: Update<CheckBoxBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.CheckBox,
        valid: valid,
      },
    };
    this.dispatchUpdate(newBlock);
  }
}
