import { Injectable } from '@angular/core';

import { IBlockHooks } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { B2BlockHooks } from '../models';

import * as setOfRules from '../rules';

import { B2DatePickerHooksTriggerService } from './blocks/date-picker/date-picker-hooks-trigger.service';

@Injectable()
export class B2BlockHooksService implements IBlockHooks {
  module: string;

  constructor(protected datePickerHooksTrigger: B2DatePickerHooksTriggerService) {
    this.module = module;
  }

  subscribeAll(hooks: B2BlockHooks): void {
    this.datePickerHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.datePickerHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    // @ts-ignore: error TS7017: Element implicitly has an 'any' type because type 'typeof "..."' has no index signature.
    const hooks = setOfRules[config] as any;
    return hooks ? hooks : {};
  }
}
