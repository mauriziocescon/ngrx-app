import { Injectable } from '@angular/core';

import { IBlockHooks } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { B2BlockHooks } from '../models';

import * as setOfRules from '../rules';

@Injectable()
export class B2BlockHooksService implements IBlockHooks {
  module: string;

  constructor() {
    this.module = module;
  }

  subscribeAll(hooks: B2BlockHooks): void {
  }

  unsubscribeAll(): void {
  }

  getSetOfHooks(config: string): any {
    // @ts-ignore: error TS7017: Element implicitly has an 'any' type because type 'typeof "..."' has no index signature.
    const hooks = setOfRules[config] as any;
    return hooks ? hooks : {};
  }
}
