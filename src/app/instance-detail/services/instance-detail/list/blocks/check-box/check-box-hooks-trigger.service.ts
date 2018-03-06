import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooks,
  CheckBoxBlock,
} from "../../../../../models";

import { CheckBoxActionsService } from "./check-box-actions.service";

import { BlockActionsIntegrationService } from "../../../../integration";

@Injectable()
export class CheckBoxHooksTriggerService {
  protected hooks: BlockHooks | undefined;

  protected checkBoxBlockLoadSubscription: Subscription;
  protected checkBoxBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService,
              protected checkBoxActions: CheckBoxActionsService) {
  }

  subscribeAll(hooks: BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToCheckBoxBlockLoad();
    this.subscribeToCheckBoxBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.checkBoxBlockLoadSubscription) {
      this.checkBoxBlockLoadSubscription.unsubscribe();
    }
    if (this.checkBoxBlockChangesSubscription) {
      this.checkBoxBlockChangesSubscription.unsubscribe();
    }
  }

  protected subscribeToCheckBoxBlockLoad(): void {
    this.checkBoxBlockLoadSubscription = this.checkBoxActions.blockLoadObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (this.hooks && block.hooks.checkBoxBlockDidLoad) {
            const checkBoxBlockDidLoad = this.hooks[block.hooks.checkBoxBlockDidLoad];
            if (checkBoxBlockDidLoad) {
              checkBoxBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxBlockChanges(): void {
    this.checkBoxBlockChangesSubscription = this.checkBoxActions.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (this.hooks && block.hooks.checkBoxBlockDidChange) {
            const checkBoxBlockDidChange = this.hooks[block.hooks.checkBoxBlockDidChange];
            if (checkBoxBlockDidChange) {
              checkBoxBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
