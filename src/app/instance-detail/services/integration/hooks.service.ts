import { Inject, Injectable } from "@angular/core";

import { BLOCK_HOOKS_TOKEN, IBlockHooks } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockHooksIntegrationService {
  protected baseService: IBlockHooks;
  protected customService: IBlockHooks;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_HOOKS_TOKEN) protected blockHooks: IBlockHooks[]) {
  }

  setConfig(config: string): void {
    this.unsubscribeAll();
    const module = this.instanceParams.getInstanceParams().module;
    this.customService = this.blockHooks.find((bh: IBlockHooks) => {
      return bh.key === module;
    });
    this.baseService = this.blockHooks.find((bh: IBlockHooks) => {
      return bh.key === "base";
    });
    this.baseService.subscribeAll(this.getSetOfHooks(module, config));
    this.customService.subscribeAll(this.getSetOfHooks(module, config));
  }

  unsubscribeAll(): void {
    this.blockHooks.forEach((bh: IBlockHooks) => {
      bh.unsubscribeAll();
    });
  }

  getSetOfHooks(module: string, name: string): any {
    return this.customService.getSetOfHooks(module, name);
  }
}
