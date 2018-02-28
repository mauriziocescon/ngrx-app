import { Inject, Injectable } from "@angular/core";

import { AppConstantsService } from "../../../core/core.module";

import { BLOCK_HOOKS_TOKEN, IBlockHooks } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockHooksIntegrationService {

  constructor(protected appConstants: AppConstantsService,
              protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_HOOKS_TOKEN) protected blockHooks: IBlockHooks[]) {
  }

  protected get defaultBlockHooks(): IBlockHooks {
    return this.blockHooks.find((blockHooks: IBlockHooks) => {
      return blockHooks.module === this.appConstants.Application.INSTANCE_DETAIL_MODULE;
    });
  }

  protected get bBlockHooks(): IBlockHooks | undefined {
    const module = this.instanceParams.getInstanceParams().module;
    return this.blockHooks.find((blockHooks: IBlockHooks) => {
      return blockHooks.module === module;
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
