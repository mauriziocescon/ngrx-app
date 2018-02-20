import { Injectable } from "@angular/core";

import { B2BlocksHooks } from "../models";

import { B2BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class B2BlockHooksService {

  constructor(protected blockActionsTriggerService: B2BlockHooksTriggerService) {
  }

  subscribeAll(hooks: B2BlocksHooks): void {
    this.blockActionsTriggerService.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.blockActionsTriggerService.unsubscribeAll();
  }
}
