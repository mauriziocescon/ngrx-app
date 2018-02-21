import { Injectable } from "@angular/core";

import { B1BlocksHooks } from "../models";

import { B1BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

import * as setOfRules from "../rules";

@Injectable()
export class B1BlockHooksService {

  constructor(protected blockActionsTriggerService: B1BlockHooksTriggerService) {
  }

  subscribeAll(hooks: B1BlocksHooks): void {
    this.blockActionsTriggerService.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.blockActionsTriggerService.unsubscribeAll();
  }

  getSetOfHooks(name: string): any {
    return setOfRules[name] ? setOfRules[name] : {};
  }
}
