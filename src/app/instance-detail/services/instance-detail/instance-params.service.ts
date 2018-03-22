import { Injectable } from '@angular/core';

import { InstanceParams } from '../../models';

@Injectable()
export class InstanceParamsService {
  protected instanceParams: InstanceParams;

  setInstanceParams(instanceParams: InstanceParams): void {
    this.instanceParams = {
      ...instanceParams,
    };
  }

  getInstanceParams(): InstanceParams {
    return {
      ...this.instanceParams,
    };
  }
}
