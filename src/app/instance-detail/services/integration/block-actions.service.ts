import { Inject, Injectable } from "@angular/core";

import { AppConstantsService } from "../../../core/core.module";

import { BLOCK_ACTIONS_TOKEN, IBlockActions } from "../../tokens";

import { InstanceParamsService } from "../instance-detail/instance-params.service";

@Injectable()
export class BlockActionsIntegrationService {

  constructor(protected appConstants: AppConstantsService,
              protected instanceParams: InstanceParamsService,
              @Inject(BLOCK_ACTIONS_TOKEN) protected blockActions: IBlockActions[]) {
  }

  protected get defaultBlockActions(): IBlockActions {
    return this.blockActions.find((blockActions: IBlockActions) => {
      return blockActions.key === this.appConstants.Application.INSTANCE_DETAIL_KEY;
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
