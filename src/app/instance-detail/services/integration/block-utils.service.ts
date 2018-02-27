import { Inject, Injectable } from "@angular/core";

import { Block } from "../../../instance-detail/instance-detail.module";

import { InstanceParamsService } from "../instance-detail/instance-params.service";
import { BLOCK_UTILS_TOKEN, IBlockUtils } from "../../tokens";

@Injectable()
export class BlockUtilsIntegrationService {
  protected defaultBlockUtils: IBlockUtils;
  protected bBlockUtils: IBlockUtils;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_UTILS_TOKEN) protected blockUtils: IBlockUtils[]) {
  }

  getComponentForBlock(block: Block): any {
    const module = this.instanceParams.getInstanceParams().module;
    this.bBlockUtils = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === module;
    });
    this.defaultBlockUtils = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === "base";
    });

    if (this.bBlockUtils) {
      return this.bBlockUtils.getComponentForBlock(block) ||
        this.defaultBlockUtils.getComponentForBlock(block);
    }
    return this.defaultBlockUtils.getComponentForBlock(block);
  }

  triggerComponentDidLoad(block: Block): boolean {
    const module = this.instanceParams.getInstanceParams().module;
    this.bBlockUtils = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === module;
    });
    this.defaultBlockUtils = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === "base";
    });
    if (this.bBlockUtils) {
      return this.bBlockUtils.triggerComponentDidLoad(block) ||
        this.defaultBlockUtils.triggerComponentDidLoad(block);
    }
    return this.defaultBlockUtils.triggerComponentDidLoad(block);
  }
}
