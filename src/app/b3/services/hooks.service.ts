import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import * as setOfRules from "../rules";

@Injectable()
export class B3BlockHooksService implements IBlockHooks {
  key: string;

  constructor() {
    this.key = "b3";
  }

  subscribeAll(hooks: any): void {
    // do nothing
  }

  unsubscribeAll(): void {
    // do nothing
  }

  getSetOfHooks(name: string): any {
    return setOfRules[name] ? setOfRules[name] : {};
  }
}
