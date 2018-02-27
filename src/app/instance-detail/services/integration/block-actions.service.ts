import { Inject, Injectable } from "@angular/core";

import { BLOCK_ACTIONS_TOKEN, IBlockActions } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockActionsIntegrationService {

  constructor(protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_ACTIONS_TOKEN) protected blockActions: IBlockActions[]) {
  }

  protected get defaultBlockActions(): IBlockActions {
    return this.blockActions.find((blockActions: IBlockActions) => {
      return blockActions.key === "base";
    });
  }

  protected get bBlockActions(): IBlockActions | undefined {
    const module = this.instanceParams.getInstanceParams().module;
    return this.blockActions.find((blockActions: IBlockActions) => {
      return blockActions.key === module;
    });
  }

  getActions(): any {
    return {
      ...(this.bBlockActions ? this.bBlockActions.getActions() : {}),
      ...(this.defaultBlockActions.getActions() ? this.defaultBlockActions.getActions() : {}),
    };
  }
}
