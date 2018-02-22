import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import { BlockActionsIntegrationService } from "../../../instance-detail/instance-detail.module";

import {
  B2BlocksHooks,
  DatePickerBlock,
} from "../../models";

import { DatePickerActionsService } from "./date-picker-actions.service";

@Injectable()
export class B2BlockHooksTriggerService {
  protected hooks: B2BlocksHooks;

  protected datePickerBlockLoadSubscription: Subscription;

  protected datePickerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blocksActions: BlockActionsIntegrationService,
              protected datePickerService: DatePickerActionsService) {
  }

  subscribeAll(hooks: B2BlocksHooks): void {
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
    this.datePickerService.blockLoadObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          this.hooks[block.hooks.datePickerBlockDidLoad](block, this.blocksActions.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDatePickerBlockChanges(): void {
    this.datePickerService.blockChangesObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          this.hooks[block.hooks.datePickerBlockDidChange](block, this.blocksActions.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}