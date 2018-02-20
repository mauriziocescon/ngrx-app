import { Injectable } from "@angular/core";

import {
  InstanceParamsService,
  BlockHooksService,
  BlockHooksTriggerService,
} from "../../../instance-detail/instance-detail.module";

import { B1BlockHooksService, B1BlocksHooks } from "../../../b1";
import { B2BlockHooksService, B2BlocksHooks } from "../../../b2";

import {
  CustomBlocksHooks,
  Modules,
} from "../models";

import * as setOfRules from "../../custom-rules-integration";

@Injectable()
export class CustomBlockHooksService extends BlockHooksService {

  constructor(protected instanceParams: InstanceParamsService,
              protected blockHooksTriggerService: BlockHooksTriggerService,
              protected b1BlockHooksService: B1BlockHooksService,
              protected b2BlockHooksService: B2BlockHooksService) {
    super(
      instanceParams,
      blockHooksTriggerService,
    );
  }

  setConfig(config: string): void {
    this.unsubscribeAll();
    super.setConfig(config);
  }

  subscribeAll(hooks: CustomBlocksHooks): void {
    super.subscribeAll(hooks);
    const module = this.instanceParams.getInstanceParams().module;

    if (module === Modules.b1) {
      this.b1BlockHooksService.subscribeAll(hooks as B1BlocksHooks);
    } else if (module === Modules.b2) {
      this.b2BlockHooksService.subscribeAll(hooks as B2BlocksHooks);
    }
  }

  getSetOfHooks(module: string, name: string): any {
    return setOfRules[module][name] ? setOfRules[module][name] : {};
  }

  unsubscribeAll(): void {
    super.unsubscribeAll();

    this.b1BlockHooksService.unsubscribeAll();
    this.b2BlockHooksService.unsubscribeAll();
  }
}
