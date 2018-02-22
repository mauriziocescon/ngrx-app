import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Block } from "../../../instance-detail/instance-detail.module";

import { InstanceParamsService } from "../instance-detail/instance-params.service";
import { BLOCK_UTILS_TOKEN, IBlockUtils } from "../../tokens";

@Injectable()
export class BlockUtilsIntegrationService {
  protected baseService: IBlockUtils;
  protected customService: IBlockUtils;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_UTILS_TOKEN) protected blockUtils: IBlockUtils[]) {
  }

  getComponentForBlock(block: Block): any {
    const module = this.instanceParams.getInstanceParams().module;
    this.customService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === module;
    });
    this.baseService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === "base";
    });

    if (this.customService) {
      return this.customService.getComponentForBlock(block) ||
        this.baseService.getComponentForBlock(block);
    }
    return this.baseService.getComponentForBlock(block);
  }

  triggerComponentDidLoad(block: Block): boolean {
    const module = this.instanceParams.getInstanceParams().module;
    this.customService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === module;
    });
    this.baseService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === "base";
    });
    if (this.customService) {
      return this.customService.triggerComponentDidLoad(block) ||
        this.baseService.triggerComponentDidLoad(block);
    }
    return this.baseService.triggerComponentDidLoad(block);
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    const module = this.instanceParams.getInstanceParams().module;
    this.customService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === module;
    });
    this.baseService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === "base";
    });
    if (this.customService) {
      return this.customService.getAllEditedBlocksSelector();
    }
    return this.baseService.getAllEditedBlocksSelector();
  }

  getValiditySelector(): Observable<boolean> {
    const module = this.instanceParams.getInstanceParams().module;
    this.customService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === module;
    });
    this.baseService = this.blockUtils.find((bh: IBlockUtils) => {
      return bh.key === "base";
    });
    if (this.customService) {
      return this.customService.getValiditySelector();
    }
    return this.baseService.getValiditySelector();
  }
}
