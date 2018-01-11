import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";

import { BlocksListService } from "../services";
import { ListActionTypes, FetchBlocksComplete, FetchBlocksError } from "../actions/list.actions";

import { Block, BlockType } from "../models";
import { AddBlocks as AddCheckBoxBlocks } from "../actions/blocks/check-box.actions";
import { AddBlocks as AddDropdownBlocks } from "../actions/blocks/dropdown.actions";
import { AddBlocks as AddTextInputBlocks } from "../actions/blocks/text-input.actions";

@Injectable()
export class ListEffects {

  constructor(protected update$: Actions,
              protected blocksListService: BlocksListService) {
  }

  @Effect() fetchBlocks$: Observable<Action> = this.update$
    .ofType(ListActionTypes.FETCH_BLOCKS)
    .debounceTime(400)
    .switchMap(() => {
      return this.blocksListService.getBlocks()
        .mergeMap((blocks: Block[]) => {
          const checkBoxBlocks = blocks.filter((block: Block) => {
            return block.type === BlockType.CheckBox;
          });
          const dropdownBoxBlocks = blocks.filter((block: Block) => {
            return block.type === BlockType.Dropdown;
          });
          const textInputBoxBlocks = blocks.filter((block: Block) => {
            return block.type === BlockType.TextInput;
          });
          return [
            new FetchBlocksComplete(blocks),
            new AddCheckBoxBlocks({blocks: checkBoxBlocks}),
            new AddDropdownBlocks({blocks: dropdownBoxBlocks}),
            new AddTextInputBlocks({blocks: textInputBoxBlocks}),
          ];
        })
        .catch(err => of(new FetchBlocksError(err)));
    });
}
