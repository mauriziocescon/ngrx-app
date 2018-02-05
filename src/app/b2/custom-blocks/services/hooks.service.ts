import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  B2BlocksHooks,
  DatePickerBlock,
} from "../models";

import { DatePickerService } from "./blocks/date-picker.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class B2BlockHooksService {
  protected hooks: B2BlocksHooks;

  protected datePickerBlockLoadSubscription: Subscription;

  protected datePickerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected datePickerService: DatePickerService) {
  }

  setupB2Hooks(hooks: B2BlocksHooks, module?: string, step?: string): void {
    this.unsubscribeListeners();

    this.hooks = hooks;

    this.listenToDatePickerBlockLoad();

    this.listenToDatePickerBlockChanges();
  }

  unsubscribeListeners(): void {
    if (this.datePickerBlockLoadSubscription) {
      this.datePickerBlockLoadSubscription.unsubscribe();
    }

    if (this.datePickerBlockChangesSubscription) {
      this.datePickerBlockChangesSubscription.unsubscribe();
    }
  }

  listenToDatePickerBlockLoad(): void {
    this.datePickerService.blockLoadObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.datePickerBlockDidLoad](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.datePickerBlockDidLoad](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToDatePickerBlockChanges(): void {
    this.datePickerService.blockChangesObservable$
      .subscribe((block: DatePickerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.datePickerBlockDidChange](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.datePickerBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  blocksMethods(): any {
    return {
      datePicker: {
        ...this.datePickerService.getDatePickerMethods()
      }
    };
  }
}
