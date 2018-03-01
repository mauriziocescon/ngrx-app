import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import { BlockActionsIntegrationService } from "../../../instance-detail/instance-detail.module";

import {
  B2BlockHooks,
  DatePickerBlock,
} from "../../models";

import { B2DatePickerActionsService } from "./date-picker-actions.service";

@Injectable()
export class B2DatePickerHooksTriggerService {
  protected hooks: B2BlockHooks | undefined;

  protected datePickerBlockLoadSubscription: Subscription;
  protected datePickerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService,
              protected datePickerActions: B2DatePickerActionsService) {
  }

  subscribeAll(hooks: B2BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToDatePickerBlockLoad();
    this.subscribeToDatePickerBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.datePickerBlockLoadSubscription) {
      this.datePickerBlockLoadSubscription.unsubscribe();
    }
    if (this.datePickerBlockChangesSubscription) {
      this.datePickerBlockChangesSubscription.unsubscribe();
    }
  }

  protected subscribeToDatePickerBlockLoad(): void {
    this.datePickerBlockLoadSubscription = this.datePickerActions.blockLoadObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          if (this.hooks && block.hooks.datePickerBlockDidLoad) {
            const datePickerBlockDidLoad = this.hooks[block.hooks.datePickerBlockDidLoad];
            if (datePickerBlockDidLoad) {
              datePickerBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDatePickerBlockChanges(): void {
    this.datePickerBlockChangesSubscription = this.datePickerActions.blockChangesObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          if (this.hooks && block.hooks.datePickerBlockDidChange) {
            const datePickerBlockDidChange = this.hooks[block.hooks.datePickerBlockDidChange];
            if (datePickerBlockDidChange) {
              datePickerBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
