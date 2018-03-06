import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import * as dropdown from "../../../../../actions/list/blocks/dropdown.actions";

import { BlockType, DropdownBlock, DropdownActions } from "../../../../../models";

import * as fromInstanceDetail from "../../../../../reducers";

@Injectable()
export class DropdownActionsService {

  constructor(protected store$: Store<fromInstanceDetail.State>) {
  }

  getDropdownActions(): DropdownActions {
    return {
      changeLoading: (loading: boolean, blockId: string) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: string) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: string) => this.setValueForBlockId(value, blockId),
      setChoicesForBlockId: (choices: string[], blockId: string) => this.setChoicesForBlockId(choices, blockId),
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
    this.store$.dispatch(new dropdown.Loading(newLoading));
  }

  protected dispatchUpdate(block: Update<DropdownBlock>): void {
    const newBlock = {block: block, notify: false};
    this.store$.dispatch(new dropdown.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: string): void {
    const newBlock: Update<DropdownBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.Dropdown,
        label: label,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValueForBlockId(value: string, blockId: string): void {
    const newBlock: Update<DropdownBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.Dropdown,
        value: value,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setChoicesForBlockId(choices: string[], blockId: string): void {
    const newBlock: Update<DropdownBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.Dropdown,
        choices: choices,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: string): void {
    const newBlock: Update<DropdownBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.Dropdown,
        required: required,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: string): void {
    const newBlock: Update<DropdownBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.Dropdown,
        disabled: disabled,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: string): void {
    const newBlock: Update<DropdownBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: BlockType.Dropdown,
        valid: valid,
      },
    };
    this.dispatchUpdate(newBlock);
  }
}
