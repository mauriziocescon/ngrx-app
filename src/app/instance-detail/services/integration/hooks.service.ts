import { Inject, Injectable } from "@angular/core";

import { BLOCK_HOOKS_TOKEN, IBlockHooks } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockHooksIntegrationService {
  protected baseBlockHooks: IBlockHooks;
  protected bBlockHooks: IBlockHooks;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_HOOKS_TOKEN) protected blockHooks: IBlockHooks[]) {
  }

  setConfig(config: string): void {
    this.unsubscribeAll();
    const module = this.instanceParams.getInstanceParams().module;

    this.baseBlockHooks = this.blockHooks.find((bh: IBlockHooks) => {
      return bh.key === "base";
    });
    this.bBlockHooks = this.blockHooks.find((bh: IBlockHooks) => {
      return bh.key === module;
    });

    this.baseBlockHooks.subscribeAll(this.getSetOfHooks(module, config));
    this.bBlockHooks.subscribeAll(this.getSetOfHooks(module, config));
  }

  unsubscribeAll(): void {
    this.blockHooks.forEach((bh: IBlockHooks) => {
      bh.unsubscribeAll();
    });
  }

  getSetOfHooks(module: string, name: string): any {
    return this.bBlockHooks.getSetOfHooks(module, name);
  }
}
