import { Injectable } from '@angular/core';

import { IBlockHooks } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { B4BlockHooks } from '../models';

import * as setOfRules from '../rules';

import { B4DossierHooksTriggerService } from './blocks/dossier/dossier-hooks-trigger.service';

@Injectable()
export class B4BlockHooksService implements IBlockHooks {
  module: string;

  constructor(protected dossierHooksTrigger: B4DossierHooksTriggerService) {
    this.module = module;
  }

  subscribeAll(hooks: B4BlockHooks): void {
    this.dossierHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.dossierHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    // @ts-ignore: error TS7017: Element implicitly has an 'any' type because type 'typeof "..."' has no index signature.
    const hooks = setOfRules[config] as any;
    return hooks ? hooks : {};
  }
}
