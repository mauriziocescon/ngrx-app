import { Inject, Injectable } from "@angular/core";

import { BLOCK_ACTIONS_TOKEN, IBlockActions } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockActionsIntegrationService {
  protected baseService: IBlockActions;
  protected customService: IBlockActions;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_ACTIONS_TOKEN) protected blockActions: IBlockActions[]) {
  }

  getActions(): any {
    const module = this.instanceParams.getInstanceParams().module;
    this.customService = this.blockActions.find((bh: IBlockActions) => {
      return bh.key === module;
    });
    this.baseService = this.blockActions.find((bh: IBlockActions) => {
      return bh.key === "base";
    });

    return {
      ...this.customService.getActions(),
      ...(this.baseService.getActions() ? this.baseService.getActions() : {}),
    };
  }
}
