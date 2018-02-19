import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import { BlockHooksService } from "../../../instance-detail/instance-detail.module";

import {
  B2BlocksHooks,
  DatePickerBlock,
} from "../models";

import { DatePickerActionsService } from "./blocks/date-picker-actions.service";

@Injectable()
export class B2BlockHooksService {
  protected hooks: B2BlocksHooks;

  protected datePickerBlockLoadSubscription: Subscription;

  protected datePickerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected datePickerService: DatePickerActionsService,
              protected blockHooksService: BlockHooksService) {
  }

  setupB2Hooks(hooks: B2BlocksHooks, module?: string, step?: string): void {
    this.unsubscribeAll();

    this.hooks = hooks;

    this.subscribeToDatePickerBlockLoad();

    this.subscribeToDatePickerBlockChanges();
  }

  unsubscribeAll(): void {
    if (this.datePickerBlockLoadSubscription) {
      this.datePickerBlockLoadSubscription.unsubscribe();
    }

    if (this.datePickerBlockChangesSubscription) {
      this.datePickerBlockChangesSubscription.unsubscribe();
    }
  }

  subscribeToDatePickerBlockLoad(): void {
    this.datePickerService.blockLoadObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          this.hooks[block.hooks.datePickerBlockDidLoad](block, this.blockHooksService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToDatePickerBlockChanges(): void {
    this.datePickerService.blockChangesObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          this.hooks[block.hooks.datePickerBlockDidChange](block, this.blockHooksService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  getActions(): any {
    return {
      datePicker: {
        ...this.datePickerService.getDatePickerMethods()
      }
    };
  }
}
