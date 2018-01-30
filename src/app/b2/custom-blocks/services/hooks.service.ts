import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  B2BlocksHooks,
  B2BlocksMethods,
  DatePickerBlock,
} from "../models";

import { DatePickerService } from "./blocks/date-picker.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class B2BlockHooksService {
  hooks: B2BlocksHooks;

  constructor(protected logger: NGXLogger,
              protected datePickerService: DatePickerService) {
    this.startListenerForB2Blocks();
  }

  startListenerForB2Blocks(): void {
    this.listenToLoadDatePickerBlock();

    this.listenToDatePickerBlockChanges();
  }

  listenToLoadDatePickerBlock(): void {
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

  protected blocksMethods(): B2BlocksMethods {
    return {
      datePicker: {
        ...this.datePickerService.getDatePickerMethods(),
      }
    };
  }
}
