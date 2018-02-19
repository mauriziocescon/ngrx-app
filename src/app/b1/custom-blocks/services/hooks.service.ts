import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import { BlockHooksService } from "../../../instance-detail/instance-detail.module";

import {
  B1BlocksHooks,
  CheckBoxConfirmerBlock,
} from "../models";

import { CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

@Injectable()
export class B1BlockHooksService {
  protected hooks: B1BlocksHooks;

  protected checkBoxConfirmerBlockLoadSubscription: Subscription;

  protected checkBoxConfirmerBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected checkBoxConfirmerService: CheckBoxConfirmerActionsService,
              protected blockHooksService: BlockHooksService) {
  }

  setupB1Hooks(hooks: B1BlocksHooks, module?: string, step?: string): void {
    this.unsubscribeAll();

    this.hooks = hooks;

    this.subscribeToCheckBoxConfirmerBlockLoad();

    this.subscribeToCheckBoxConfirmerBlockChanges();
  }

  unsubscribeAll(): void {
    if (this.checkBoxConfirmerBlockLoadSubscription) {
      this.checkBoxConfirmerBlockLoadSubscription.unsubscribe();
    }

    if (this.checkBoxConfirmerBlockChangesSubscription) {
      this.checkBoxConfirmerBlockChangesSubscription.unsubscribe();
    }
  }

  subscribeToCheckBoxConfirmerBlockLoad(): void {
    this.checkBoxConfirmerBlockLoadSubscription = this.checkBoxConfirmerService.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blockHooksService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerBlockChangesSubscription = this.checkBoxConfirmerService.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          this.hooks[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blockHooksService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  getActions(): any {
    return {
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerService.getCheckBoxConfirmerMethods(),
      }
    };
  }
}
