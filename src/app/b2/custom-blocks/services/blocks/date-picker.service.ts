import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromB2Blocks from "../../reducers";
import * as datePicker from "../../actions/blocks/date-picker.actions";
import { B2BlockType, DatePickerBlock, DatePickerMethods } from "../../models";

@Injectable()
export class DatePickerService {
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

  getDatePickerMethods(): DatePickerMethods {
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

  blockDidChange(block: { id: number, changes: DatePickerBlock }): void {
    const newBlock: DatePickerBlock = {...block.changes, hooks: {...block.changes.hooks}};
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store$.dispatch(new datePicker.Loading(newLoading));
  }

  protected setBlock(block: { block: { id: number, changes: DatePickerBlock } }): void {
    const newBlock = {block: block.block, notify: false};
    this.store$.dispatch(new datePicker.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: B2BlockType.DatePicker,
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
          type: B2BlockType.DatePicker,
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
          type: B2BlockType.DatePicker,
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
          type: B2BlockType.DatePicker,
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
          type: B2BlockType.DatePicker,
          valid: valid,
        },
      }
    };
    this.setBlock(newBlock);
  }
}
