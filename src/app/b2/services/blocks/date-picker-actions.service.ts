import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromB2Blocks from "../../reducers";
import * as datePicker from "../../actions/blocks/date-picker.actions";
import { B2BlockType, DatePickerBlock, DatePickerActions } from "../../models";

@Injectable()
export class B2DatePickerActionsService {
  protected blockLoadSubject$: Subject<DatePickerBlock>;
  readonly blockLoadObservable$: Observable<DatePickerBlock>;

  protected blockChangesSubject$: Subject<DatePickerBlock>;
  readonly blockChangesObservable$: Observable<DatePickerBlock>;

  constructor(protected store$: Store<fromB2Blocks.State>) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  getDatePickerActions(): DatePickerActions {
    return {
      changeLoading: (loading: boolean, blockId: number) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: number) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: number) => this.setValueForBlockId(value, blockId),
      setRequiredForBlockId: (required: boolean, blockId: number) => this.setRequiredForBlockId(required, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: number) => this.setDisabledForBlockId(disabled, blockId),
      setValidityForBlockId: (valid: boolean, blockId: number) => this.setValidityForBlockId(valid, blockId),
    };
  }

  blockDidload(block: DatePickerBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: Update<DatePickerBlock>): void {
    const newBlock = {...block.changes, hooks: {...block.changes.hooks}} as DatePickerBlock;
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
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

  setLabelForBlockId(label: string, blockId: number): void {
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

  setValueForBlockId(value: string, blockId: number): void {
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

  setRequiredForBlockId(required: boolean, blockId: number): void {
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

  setDisabledForBlockId(disabled: boolean, blockId: number): void {
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

  setValidityForBlockId(valid: boolean, blockId: number): void {
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
