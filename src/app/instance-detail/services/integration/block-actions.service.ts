import { Inject, Injectable } from "@angular/core";

import { BLOCK_ACTIONS_TOKEN, IBlockActions } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockActionsIntegrationService {
  protected defaultBlockActions: IBlockActions;
  protected bBlockActions: IBlockActions;

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_ACTIONS_TOKEN) protected blockActions: IBlockActions[]) {
  }

  getActions(): any {
    const module = this.instanceParams.getInstanceParams().module;
    this.bBlockActions = this.blockActions.find((bh: IBlockActions) => {
      return bh.key === module;
    });
    this.defaultBlockActions = this.blockActions.find((bh: IBlockActions) => {
      return bh.key === "base";
    });

    return {
      ...(this.bBlockActions ? this.bBlockActions.getActions() : {}),
      ...(this.defaultBlockActions.getActions() ? this.defaultBlockActions.getActions() : {}),
    };
  }
}
