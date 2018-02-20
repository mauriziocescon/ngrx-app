import { Injectable } from "@angular/core";

import { B1BlocksHooks } from "../models";

import { B1BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class B1BlockHooksService {
  protected hooks: B1BlocksHooks;
  protected module: string;
  protected step: string;

  constructor(protected blockActionsTriggerService: B1BlockHooksTriggerService) {
  }

  setupB1Hooks(hooks: B1BlocksHooks, module?: string, step?: string): void {
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
