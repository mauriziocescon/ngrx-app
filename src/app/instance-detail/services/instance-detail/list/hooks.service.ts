import { Injectable } from "@angular/core";

import { InstanceParamsService } from "../instance-params.service";

import { BlocksHooks } from "../../../models";

import { IBlockHooks } from "../../../tokens";

import { BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class BlockHooksService implements IBlockHooks {
  key: string;

  protected config: string;

  constructor(protected instanceParams: InstanceParamsService,
              protected blockHooksTriggerService: BlockHooksTriggerService) {
    this.key = "base";
  }

  setConfig(config: string): void {
    this.config = config;
    const module = this.instanceParams.getInstanceParams().module;
    this.subscribeAll(this.getSetOfHooks(module, this.config));
  }

  subscribeAll(hooks: BlocksHooks): void {
    this.blockHooksTriggerService.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.blockHooksTriggerService.unsubscribeAll();
  }

  getSetOfHooks(module: string, name: string): any {
    return {};
  }
}
