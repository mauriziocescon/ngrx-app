import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { module } from "../constants";

import { B1BlockHooks } from "../models";

import * as setOfRules from "../rules";

import { B1CheckBoxConfirmerHooksTriggerService } from "./blocks/check-box-confirmer/check-box-confirmer-hooks-trigger.service";

@Injectable()
export class B1BlockHooksService implements IBlockHooks {
  module: string;

  constructor(protected checkBoxConfirmerHooksTrigger: B1CheckBoxConfirmerHooksTriggerService) {
    this.module = module;
  }

  subscribeAll(hooks: B1BlockHooks): void {
    this.checkBoxConfirmerHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.checkBoxConfirmerHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    // @ts-ignore: error TS7017: Element implicitly has an 'any' type because type 'typeof "..."' has no index signature.
    const hooks = setOfRules[config] as any;
    return hooks ? hooks : {};
  }
}
