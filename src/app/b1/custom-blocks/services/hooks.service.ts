import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  B1BlocksHooks,
  CheckBoxConfirmerBlock,
} from "../models";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

@Injectable()
export class B1BlockHooksService {
  protected hooks: B1BlocksHooks;

  protected checkBoxConfirmerBlockLoadSubscription: Subscription;

  protected checkBoxConfirmerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
  }

  setupB1Hooks(hooks: B1BlocksHooks, module?: string, step?: string): void {
    this.unsubscribeAll();

    this.hooks = hooks;

    this.listenToCheckBoxConfirmerBlockLoad();

    this.listenToCheckBoxConfirmerBlockChanges();
  }

  unsubscribeAll(): void {
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
          this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksMethods());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  listenToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerBlockChangesSubscription = this.checkBoxConfirmerService.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          this.hooks[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksMethods());
        } catch (e) {
          this.logger.error(e.toString());
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
