import { Injectable } from "@angular/core";

import { InstanceParamsService } from "../instance-params.service";

import { BlocksHooks } from "../../../models";

import { BlockHooksTriggerService } from "./blocks/block-hooks-trigger.service";

@Injectable()
export class BlockHooksService {
  protected config: string;

  constructor(protected instanceParams: InstanceParamsService,
              protected blockHooksTriggerService: BlockHooksTriggerService) {
  }

  setConfig(config: string): void {
    this.config = config;
    const module = this.instanceParams.getInstanceParams().module;
    this.subscribeAll(this.getSetOfHooks(module, this.config));
  }

  protected subscribeAll(hooks: BlocksHooks): void {
    this.blockHooksTriggerService.subscribeAll(hooks);
  }

  protected unsubscribeAll(): void {
    this.blockHooksTriggerService.unsubscribeAll();
  }

  protected getSetOfHooks(module: string, name: string): any {
    return {};
  }
}
