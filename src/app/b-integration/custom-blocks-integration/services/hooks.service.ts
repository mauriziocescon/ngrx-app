import { Injectable } from "@angular/core";

import { BlockHooksService } from "../../../instance-detail/instance-detail.module";

import { BlockHooksTriggerService } from "../../../instance-detail/services/list/blocks/block-hooks-trigger.service";

import { B1BlockHooksService, B1BlocksHooks } from "../../../b1";
import { B2BlockHooksService, B2BlocksHooks } from "../../../b2";

import {
  CustomBlocksHooks,
  Modules,
} from "../models";

import * as setOfRules from "../../custom-rules-integration";

@Injectable()
export class CustomBlockHooksService extends BlockHooksService {

  constructor(protected blockHooksTriggerService: BlockHooksTriggerService,
              protected b1BlockHooksService: B1BlockHooksService,
              protected b2BlockHooksService: B2BlockHooksService) {
    super(
      blockHooksTriggerService,
    );
  }

  setupHooks(hooks: CustomBlocksHooks, module?: string, step?: string): void {
    this.unsubscribeAll();

    super.setupHooks(hooks, module, step);

    if (module === Modules.b1) {
      this.b1BlockHooksService.setupB1Hooks(hooks as B1BlocksHooks, module, step);
    } else if (module === Modules.b2) {
      this.b2BlockHooksService.setupB2Hooks(hooks as B2BlocksHooks, module, step);
    }
  }

  getSetOfRules(module: string, name: string): any {
    return setOfRules[module][name] ? setOfRules[module][name] : {};
  }

  unsubscribeAll(): void {
    super.unsubscribeAll();

    this.b1BlockHooksService.unsubscribeAll();
    this.b2BlockHooksService.unsubscribeAll();
  }
}
