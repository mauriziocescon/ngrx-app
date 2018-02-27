import { Inject, Injectable } from "@angular/core";

import { BLOCK_HOOKS_TOKEN, IBlockHooks } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockHooksIntegrationService {
  protected defaultBlockHooks: IBlockHooks;
  protected bBlockHooks: IBlockHooks;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_HOOKS_TOKEN) protected blockHooks: IBlockHooks[]) {
  }

  setConfig(config: string): void {
    this.unsubscribeAll();
    const module = this.instanceParams.getInstanceParams().module;
    this.bBlockHooks = this.blockHooks.find((bh: IBlockHooks) => {
      return bh.key === module;
    });
    this.defaultBlockHooks = this.blockHooks.find((bh: IBlockHooks) => {
      return bh.key === "base";
    });
    if (this.bBlockHooks) {
      this.bBlockHooks.subscribeAll(this.getSetOfHooks(config));
    }
    this.defaultBlockHooks.subscribeAll(this.getSetOfHooks(config));
  }

  unsubscribeAll(): void {
    this.blockHooks.forEach((bh: IBlockHooks) => {
      if (bh.unsubscribeAll) {
        bh.unsubscribeAll();
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
