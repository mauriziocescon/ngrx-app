import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import * as fromDynamicBlocksList from "../../reducers";
import * as dropdown from "../../actions/blocks/dropdown.actions";
import { BlockType, DropdownBlock, DropdownMethods } from "../../models";

@Injectable()
export class DropdownService {
  protected blockLoadSubject$: Subject<DropdownBlock>;
  readonly blockLoadObservable$: Observable<DropdownBlock>;

  protected blockChangesSubject$: Subject<DropdownBlock>;
  readonly blockChangesObservable$: Observable<DropdownBlock>;

  constructor(protected store: Store<fromDynamicBlocksList.State>) {
    this.blockLoadSubject$ = new Subject();
    this.blockLoadObservable$ = this.blockLoadSubject$.asObservable();

    this.blockChangesSubject$ = new Subject();
    this.blockChangesObservable$ = this.blockChangesSubject$.asObservable();
  }

  getDropdownMethods(): DropdownMethods {
    return {
      changeLoading: (loading: boolean, blockId: number) => this.changeLoading(loading, blockId),
      setLabelForBlockId: (label: string, blockId: number) => this.setLabelForBlockId(label, blockId),
      setValueForBlockId: (value: string, blockId: number) => this.setValueForBlockId(value, blockId),
      setChoicesForBlockId: (choices: string[], blockId: number) => this.setChoicesForBlockId(choices, blockId),
      setRequiredForBlockId: (required: boolean, blockId: number) => this.setRequiredForBlockId(required, blockId),
      setDisabledForBlockId: (disabled: boolean, blockId: number) => this.setDisabledForBlockId(disabled, blockId),
      setValidityForBlockId: (valid: boolean, blockId: number) => this.setValidityForBlockId(valid, blockId),
    };
  }

  blockDidload(block: DropdownBlock): void {
    this.blockLoadSubject$.next(block);
  }

  blockDidChange(block: { id: number, changes: DropdownBlock }): void {
    const newBlock: DropdownBlock = {...block.changes, hooks: {...block.changes.hooks}};
    this.blockChangesSubject$.next(newBlock);
  }

  changeLoading(loading: boolean, blockId: number): void {
    const newLoading = {
      id: blockId,
      loading: loading,
    };
    this.store.dispatch(new dropdown.Loading(newLoading));
  }

  protected setBlock(block: { block: { id: number, changes: DropdownBlock } }): void {
    const newBlock = {block: block.block, notify: false};
    this.store.dispatch(new dropdown.UpdateBlock(newBlock));
  }

  setLabelForBlockId(label: string, blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.Dropdown,
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
          type: BlockType.Dropdown,
          value: value,
        },
      }
    };
    this.setBlock(newBlock);
  }

  setChoicesForBlockId(choices: string[], blockId: number): void {
    const newBlock = {
      block: {
        id: blockId,
        changes: {
          id: blockId,
          type: BlockType.Dropdown,
          choices: choices,
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
          type: BlockType.Dropdown,
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
          type: BlockType.Dropdown,
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