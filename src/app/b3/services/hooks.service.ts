import { Injectable } from "@angular/core";

import * as setOfRules from "../rules";

@Injectable()
export class B3BlockHooksService {

  constructor() {
  }

  subscribeAll(hooks: any): void {

  }

  unsubscribeAll(): void {

  }

  getSetOfHooks(name: string): any {
    return setOfRules[name] ? setOfRules[name] : {};
  }
}
