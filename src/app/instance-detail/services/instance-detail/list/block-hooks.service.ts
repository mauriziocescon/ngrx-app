import { Injectable } from '@angular/core';

import { AppConstantsService } from '../../../../core/core.module';

import { BlockHooks } from '../../../models';

import { IBlockHooks } from '../../../tokens';

@Injectable()
export class BlockHooksService implements IBlockHooks {
  module: string;

  constructor(protected appConstants: AppConstantsService) {
    this.module = this.appConstants.Application.INSTANCE_DETAIL_MODULE;
  }

  subscribeAll(hooks: BlockHooks): void {
  }

  unsubscribeAll(): void {
  }

  getSetOfHooks(config: string): any {
    return {};
  }
}
