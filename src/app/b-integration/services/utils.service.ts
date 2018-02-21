import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import {
  Block,
  BlockUtilsService,
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
} from "../../instance-detail/instance-detail.module";

import { B1BlockUtilsService, fromB1 } from "../../b1/b1.module";
import { B2BlockUtilsService, fromB2 } from "../../b2/b2.module";

import { Modules } from "../models";

@Injectable()
export class CustomBlockUtilsService extends BlockUtilsService {

  constructor(protected store$: Store<any>,
              protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService,
              protected b1BlockUtilsService: B1BlockUtilsService,
              protected b2BlockUtilsService: B2BlockUtilsService) {
    super(
      store$,
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getComponentForBlock(block: Block): any {
    return this.b1BlockUtilsService.getComponentForBlock(block) ||
      this.b2BlockUtilsService.getComponentForBlock(block) ||
      super.getComponentForBlock(block);
  }

  triggerComponentDidLoad(block: Block): boolean {
    return this.b1BlockUtilsService.triggerComponentDidLoad(block) ||
      this.b2BlockUtilsService.triggerComponentDidLoad(block) ||
      super.triggerComponentDidLoad(block);
  }

  getAllEditedBlocksSelector(module: string, instance: string, step: string): Observable<Block[]> {
    if (module === Modules.b1) {
      return this.store$.select(fromB1.getAllEditedBlocksState);
    } else if (module === Modules.b2) {
      return this.store$.select(fromB2.getAllEditedBlocksState);
    } else {
      return super.getAllEditedBlocksSelector(module, instance, step);
    }
  }

  getValiditySelector(module: string, instance: string, step: string): Observable<boolean> {
    if (module === Modules.b1) {
      return this.store$.select(fromB1.getAllEditedBlocksValidityState);
    } else if (module === Modules.b2) {
      return this.store$.select(fromB2.getAllEditedBlocksValidityState);
    } else {
      return super.getValiditySelector(module, instance, step);
    }
  }
}
