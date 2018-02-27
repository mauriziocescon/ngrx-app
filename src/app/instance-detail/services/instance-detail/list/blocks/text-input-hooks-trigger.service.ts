import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  TextInputBlock,
} from "../../../../models";

import { TextInputActionsService } from "./text-input-actions.service";

import { BlockActionsIntegrationService } from "../../../integration";

@Injectable()
export class TextInputHooksTriggerService {
  protected hooks: BlocksHooks | {};

  protected textInputBlockLoadSubscription: Subscription;
  protected textInputBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService,
              protected textInputActions: TextInputActionsService) {
  }

  subscribeAll(hooks: BlocksHooks): void {
    this.hooks = hooks;

    this.subscribeToTextInputBlockLoad();
    this.subscribeToTextInputBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.textInputBlockLoadSubscription) {
      this.textInputBlockLoadSubscription.unsubscribe();
    }
    if (this.textInputBlockChangesSubscription) {
      this.textInputBlockChangesSubscription.unsubscribe();
    }
  }

  protected subscribeToTextInputBlockLoad(): void {
    this.textInputBlockLoadSubscription = this.textInputActions.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          const textInputBlockDidLoad = this.hooks[block.hooks.textInputBlockDidLoad];
          if (textInputBlockDidLoad) {
            textInputBlockDidLoad(block, this.blockActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToTextInputBlockChanges(): void {
    this.textInputBlockChangesSubscription = this.textInputActions.blockChangesObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          const textInputBlockDidChange = this.hooks[block.hooks.textInputBlockDidChange];
          if (textInputBlockDidChange) {
            textInputBlockDidChange(block, this.blockActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
