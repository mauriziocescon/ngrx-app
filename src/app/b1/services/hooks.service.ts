import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { B1BlocksHooks } from "../models";

import * as setOfRules from "../rules";

import { B1BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class B1BlockHooksService implements IBlockHooks {
  key: string;

  constructor(protected blockActionsTriggerService: B1BlockHooksTriggerService) {
    this.key = "b1";
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
