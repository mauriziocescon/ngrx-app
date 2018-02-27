import { Inject, Injectable } from "@angular/core";

import { BLOCK_HOOKS_TOKEN, IBlockHooks } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockHooksIntegrationService {

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_HOOKS_TOKEN) protected blockHooks: IBlockHooks[]) {
  }

  protected get defaultBlockHooks(): IBlockHooks {
    return this.blockHooks.find((blockHooks: IBlockHooks) => {
      return blockHooks.key === "base";
    });
  }

  protected get bBlockHooks(): IBlockHooks | undefined {
    const module = this.instanceParams.getInstanceParams().module;
    return this.blockHooks.find((blockHooks: IBlockHooks) => {
      return blockHooks.key === module;
    });
  }

  setConfig(config: string): void {
    this.unsubscribeAll();

    if (this.bBlockHooks) {
      this.bBlockHooks.subscribeAll(this.getSetOfHooks(config));
    }
    this.defaultBlockHooks.subscribeAll(this.getSetOfHooks(config));
  }

  unsubscribeAll(): void {
    this.blockHooks.forEach((blockHooks: IBlockHooks) => {
      if (blockHooks.unsubscribeAll) {
        blockHooks.unsubscribeAll();
      }
    });
  }

  getSetOfHooks(config: string): any {
    if (this.bBlockHooks) {
      return this.bBlockHooks.getSetOfHooks(config);
    }
    return this.defaultBlockHooks.getSetOfHooks(config);
  }
}
