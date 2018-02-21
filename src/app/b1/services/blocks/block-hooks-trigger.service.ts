import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import { BlockActionsIntegrationService } from "../../../instance-detail/instance-detail.module";

import {
  B1BlocksHooks,
  CheckBoxConfirmerBlock,
} from "../../models";

import { CheckBoxConfirmerActionsService } from "./check-box-confirmer-actions.service";

@Injectable()
export class B1BlockHooksTriggerService {
  protected hooks: B1BlocksHooks;

  protected checkBoxConfirmerBlockLoadSubscription: Subscription;

  protected checkBoxConfirmerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blocksActions: BlockActionsIntegrationService,
              protected checkBoxConfirmerService: CheckBoxConfirmerActionsService) {
  }

  subscribeAll(hooks: B1BlocksHooks): void {
    this.hooks = hooks;

    this.subscribeToCheckBoxConfirmerBlockLoad();

    this.subscribeToCheckBoxConfirmerBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.checkBoxConfirmerBlockLoadSubscription) {
      this.checkBoxConfirmerBlockLoadSubscription.unsubscribe();
    }
    if (this.checkBoxConfirmerBlockChangesSubscription) {
      this.checkBoxConfirmerBlockChangesSubscription.unsubscribe();
    }
  }

  protected subscribeToCheckBoxConfirmerBlockLoad(): void {
    this.checkBoxConfirmerBlockLoadSubscription = this.checkBoxConfirmerService.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksActions.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerBlockChangesSubscription = this.checkBoxConfirmerService.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          this.hooks[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksActions.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
