import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import * as fromDynamicBlocksList from "../reducers";

import { BlockListService } from "./list.service";

@Injectable()
export class BlocksSyncService {

  constructor(protected route:  ActivatedRoute,
              protected store$: Store<fromDynamicBlocksList.State>,
              protected blockList: BlockListService) {
  }

  helperFunction(): any {
    const module = this.route.snapshot.paramMap.get("module");
    const instance = this.route.snapshot.paramMap.get("instance");
    const step = this.route.snapshot.paramMap.get("step");

    return this.blockList.getAllEditBlocksSelector(module, instance, step);
  }

  payloadFunction(blocks): any {
    const module = this.route.snapshot.paramMap.get("module");
    const instance = this.route.snapshot.paramMap.get("instance");
    const step = this.route.snapshot.paramMap.get("step");

    return {
      module: module,
      instance: instance,
      step: step,
      blocks: blocks,
    };
  }
}
