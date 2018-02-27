import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  CheckBoxBlock,
} from "../../../../models";

import { CheckBoxActionsService } from "./check-box-actions.service";

import { BlockActionsIntegrationService } from "../../../integration";

@Injectable()
export class CheckBoxHooksTriggerService {
  protected hooks: BlocksHooks | {};

  protected checkBoxBlockLoadSubscription: Subscription;
  protected checkBoxBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActionsService: BlockActionsIntegrationService,
              protected checkBoxActionsService: CheckBoxActionsService) {
  }

  subscribeAll(hooks: BlocksHooks): void {
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
    this.checkBoxBlockLoadSubscription = this.checkBoxActionsService.blockLoadObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          const checkBoxBlockDidLoad = this.hooks[block.hooks.checkBoxBlockDidLoad];
          if (checkBoxBlockDidLoad) {
            checkBoxBlockDidLoad(block, this.blockActionsService.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxBlockChanges(): void {
    this.checkBoxBlockChangesSubscription = this.checkBoxActionsService.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          const checkBoxBlockDidChange = this.hooks[block.hooks.checkBoxBlockDidChange];
          if (checkBoxBlockDidChange) {
            checkBoxBlockDidChange(block, this.blockActionsService.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
