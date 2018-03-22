import { Injectable } from '@angular/core';

import { AppConstantsService } from '../../../../core/core.module';

import { BlockHooks } from '../../../models';

import { IBlockHooks } from '../../../tokens';

import { TextInputHooksTriggerService } from './blocks/text-input/text-input-hooks-trigger.service';
import { CheckBoxHooksTriggerService } from './blocks/check-box/check-box-hooks-trigger.service';
import { DropdownHooksTriggerService } from './blocks/dropdown/dropdown-hooks-trigger.service';

@Injectable()
export class BlockHooksService implements IBlockHooks {
  module: string;

  constructor(protected appConstants: AppConstantsService,
              protected checkBoxHooksTrigger: CheckBoxHooksTriggerService,
              protected dropdownHooksTrigger: DropdownHooksTriggerService,
              protected textInputHooksTrigger: TextInputHooksTriggerService) {
    this.module = this.appConstants.Application.INSTANCE_DETAIL_MODULE;
  }

  subscribeAll(hooks: BlockHooks): void {
    this.checkBoxHooksTrigger.subscribeAll(hooks);
    this.dropdownHooksTrigger.subscribeAll(hooks);
    this.textInputHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.checkBoxHooksTrigger.unsubscribeAll();
    this.dropdownHooksTrigger.unsubscribeAll();
    this.textInputHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    return {};
  }
}
