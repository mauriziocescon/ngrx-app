import { Inject, Injectable } from '@angular/core';

import { AppConstantsService } from '../../../core/core.module';

import { Block } from '../../models';

import { BLOCK_UTILS_TOKEN, IBlockUtils } from '../../tokens';

import { InstanceParamsService } from '../instance-detail/instance-params.service';

@Injectable()
export class BlockUtilsIntegrationService {

  constructor(protected appConstants: AppConstantsService,
              protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_UTILS_TOKEN) protected blockUtils: IBlockUtils[]) {
  }

  protected get defaultBlockUtils(): IBlockUtils {
    return this.blockUtils.find((blockUtils: IBlockUtils) => {
      return blockUtils.module === this.appConstants.Application.INSTANCE_DETAIL_MODULE;
    }) as IBlockUtils;
  }

  protected get bBlockUtils(): IBlockUtils | undefined {
    const module = this.instanceParams.getInstanceParams().module;
    return this.blockUtils.find((blockUtils: IBlockUtils) => {
      return blockUtils.module === module;
    });
  }

  getComponentForBlock(block: Block): any {
    if (this.bBlockUtils) {
      return this.bBlockUtils.getComponentForBlock(block) ||
        this.defaultBlockUtils.getComponentForBlock(block);
    }
    return this.defaultBlockUtils.getComponentForBlock(block);
  }
}
