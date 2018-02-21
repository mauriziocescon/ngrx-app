import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { B2BlocksHooks } from "../models";

import * as setOfRules from "../rules";

import { B2BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class B2BlockHooksService implements IBlockHooks {
  key: string;

  constructor(protected blockActionsTriggerService: B2BlockHooksTriggerService) {
    this.key = "b2";
  }

  subscribeAll(hooks: B2BlocksHooks): void {
    this.blockActionsTriggerService.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.blockActionsTriggerService.unsubscribeAll();
  }

  getSetOfHooks(name: string): any {
    return setOfRules[name] ? setOfRules[name] : {};
  }
}
