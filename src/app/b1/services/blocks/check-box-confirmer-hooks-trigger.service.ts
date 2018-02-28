import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import { BlockActionsIntegrationService } from "../../../instance-detail/instance-detail.module";

import {
  B1BlockHooks,
  CheckBoxConfirmerBlock,
} from "../../models";

import { B1CheckBoxConfirmerActionsService } from "./check-box-confirmer-actions.service";

@Injectable()
export class B1CheckBoxConfirmerHooksTriggerService {
  protected hooks: B1BlockHooks | undefined;

  protected checkBoxConfirmerBlockLoadSubscription: Subscription;
  protected checkBoxConfirmerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService,
              protected checkBoxConfirmerActions: B1CheckBoxConfirmerActionsService) {
  }

  subscribeAll(hooks: B1BlockHooks): void {
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
    this.checkBoxConfirmerBlockLoadSubscription = this.checkBoxConfirmerActions.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (this.hooks && block.hooks && block.hooks.checkBoxConfirmerBlockDidLoad) {
            const checkBoxConfirmerBlockDidLoad = this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad];
            if (checkBoxConfirmerBlockDidLoad) {
              checkBoxConfirmerBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerBlockChangesSubscription = this.checkBoxConfirmerActions.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (this.hooks && block.hooks && block.hooks.checkBoxConfirmerBlockDidChange) {
            const checkBoxConfirmerBlockDidChange = this.hooks[block.hooks.checkBoxConfirmerBlockDidChange];
            if (checkBoxConfirmerBlockDidChange) {
              checkBoxConfirmerBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
