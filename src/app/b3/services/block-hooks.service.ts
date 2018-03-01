import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { module } from "../constants";

import * as setOfRules from "../rules";

@Injectable()
export class B3BlockHooksService implements IBlockHooks {
  module: string;

  constructor() {
    this.module = module;
  }

  subscribeAll(hooks: any): void {
    // do nothing
  }

  unsubscribeAll(): void {
    // do nothing
  }

  getSetOfHooks(config: string): any {
    const hooks = setOfRules[config] as any;
    return hooks ? hooks : {};
  }
}
