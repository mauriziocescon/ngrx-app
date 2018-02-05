import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  B1BlocksHooks,
  CheckBoxConfirmerBlock,
} from "../models";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class B1BlockHooksService {
  protected hooks: B1BlocksHooks;

  protected checkBoxConfirmerBlockLoadSubscription: Subscription;

  protected checkBoxConfirmerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
  }

  setupB1Hooks(hooks: B1BlocksHooks, module?: string, step?: string): void {
    this.unsubscribeListeners();

    this.hooks = hooks;

    this.listenToCheckBoxConfirmerBlockLoad();

    this.listenToCheckBoxConfirmerBlockChanges();
  }

  unsubscribeListeners(): void {
    if (this.checkBoxConfirmerBlockLoadSubscription) {
      this.checkBoxConfirmerBlockLoadSubscription.unsubscribe();
    }

    if (this.checkBoxConfirmerBlockChangesSubscription) {
      this.checkBoxConfirmerBlockChangesSubscription.unsubscribe();
    }
  }

  listenToCheckBoxConfirmerBlockLoad(): void {
    this.checkBoxConfirmerBlockLoadSubscription = this.checkBoxConfirmerService.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerBlockChangesSubscription = this.checkBoxConfirmerService.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  blocksMethods(): any {
    return {
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerService.getCheckBoxConfirmerMethods(),
      }
    };
  }
}
