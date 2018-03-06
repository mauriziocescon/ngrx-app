import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import * as datePicker from "../../../actions/blocks/date-picker.actions";

import { B2BlockType, DatePickerBlock, DatePickerActions } from "../../../models";

import * as fromB2Blocks from "../../../reducers";

@Injectable()
export class B2DatePickerActionsService {

  constructor(protected store$: Store<fromB2Blocks.State>) {
  }

  getDatePickerActions(): DatePickerActions {
    return {
      changeLoading: (loading: boolean, blockId: string) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: string) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: string) => this.setValueForBlockId(value, blockId),
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
    this.store$.dispatch(new datePicker.Loading(newLoading));
  }

  protected dispatchUpdate(block: Update<DatePickerBlock>): void {
    const newBlock = {block: block, notify: false};
    this.store$.dispatch(new datePicker.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: string): void {
    const newBlock: Update<DatePickerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B2BlockType.DatePicker,
        label: label,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValueForBlockId(value: string, blockId: string): void {
    const newBlock: Update<DatePickerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B2BlockType.DatePicker,
        value: value,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setRequiredForBlockId(required: boolean, blockId: string): void {
    const newBlock: Update<DatePickerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B2BlockType.DatePicker,
        required: required,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setDisabledForBlockId(disabled: boolean, blockId: string): void {
    const newBlock: Update<DatePickerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B2BlockType.DatePicker,
        disabled: disabled,
      },
    };
    this.dispatchUpdate(newBlock);
  }

  setValidityForBlockId(valid: boolean, blockId: string): void {
    const newBlock: Update<DatePickerBlock> = {
      id: blockId,
      changes: {
        id: blockId,
        type: B2BlockType.DatePicker,
        valid: valid,
      },
    };
    this.dispatchUpdate(newBlock);
  }
}
