import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { InstanceParamsService } from './instance-params.service';

@Injectable()
export class RulesResolve implements Resolve<string> {
  protected alertId: string;

  constructor(protected router: Router,
              protected instanceParams: InstanceParamsService) {
    this.alertId = '1';
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    if (route.paramMap.has('module') && route.paramMap.has('instance') && route.paramMap.has('step')) {
      const module = route.paramMap.get('module') as string;
      const instance = route.paramMap.get('instance') as string;
      const step = route.paramMap.get('step') as string;
      const params = {
        module: module,
        instance: instance,
        step: step,
      };
      this.instanceParams.setInstanceParams(params);
    }
    return '';
  }
}
