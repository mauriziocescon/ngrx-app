import { Injectable } from "@angular/core";

import { B2BlocksHooks } from "../models";

import { B2BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class B2BlockHooksService {
  protected hooks: B2BlocksHooks;
  protected module: string;
  protected step: string;

  constructor(protected blockActionsTriggerService: B2BlockHooksTriggerService) {
  }

  setupB2Hooks(hooks: B2BlocksHooks, module?: string, step?: string): void {
    this.blockActionsTriggerService.unsubscribeAll();

    this.hooks = hooks;
    this.module = module;
    this.step = step;

    this.blockActionsTriggerService.subscribeAll(this.hooks);
  }

  unsubscribeAll(): void {
    this.blockActionsTriggerService.unsubscribeAll();
  }
}
