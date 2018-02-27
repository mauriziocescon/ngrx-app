import { Inject, Injectable } from "@angular/core";

import { Block } from "../../models";

import { BLOCK_UTILS_TOKEN, IBlockUtils } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockUtilsIntegrationService {

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_UTILS_TOKEN) protected blockUtils: IBlockUtils[]) {
  }

  protected get defaultBlockUtils(): IBlockUtils {
    return this.blockUtils.find((blockUtils: IBlockUtils) => {
      return blockUtils.key === "base";
    });
  }

  protected get bBlockUtils(): IBlockUtils | undefined {
    const module = this.instanceParams.getInstanceParams().module;
    return this.blockUtils.find((blockUtils: IBlockUtils) => {
      return blockUtils.key === module;
    });
  }

  getComponentForBlock(block: Block): any {
    if (this.bBlockUtils) {
      return this.bBlockUtils.getComponentForBlock(block) ||
        this.defaultBlockUtils.getComponentForBlock(block);
    }
    return this.defaultBlockUtils.getComponentForBlock(block);
  }

  triggerComponentDidLoad(block: Block): boolean {
    if (this.bBlockUtils) {
      return this.bBlockUtils.triggerComponentDidLoad(block) ||
        this.defaultBlockUtils.triggerComponentDidLoad(block);
    }
    return this.defaultBlockUtils.triggerComponentDidLoad(block);
  }
}
