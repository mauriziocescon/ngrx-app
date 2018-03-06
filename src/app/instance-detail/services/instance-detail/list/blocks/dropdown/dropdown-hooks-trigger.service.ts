import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooks,
  DropdownBlock,
} from "../../../../../models";

import { DropdownActionsService } from "./dropdown-actions.service";

import { BlockActionsIntegrationService } from "../../../../integration";

@Injectable()
export class DropdownHooksTriggerService {
  protected hooks: BlockHooks | undefined;

  protected dropdownBlockLoadSubscription: Subscription;
  protected dropdownBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActions: BlockActionsIntegrationService,
              protected dropdownActions: DropdownActionsService) {
  }

  subscribeAll(hooks: BlockHooks): void {
    this.hooks = hooks;

    this.subscribeToDropdownBlockLoad();
    this.subscribeToDropdownBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.dropdownBlockLoadSubscription) {
      this.dropdownBlockLoadSubscription.unsubscribe();
    }
    if (this.dropdownBlockChangesSubscription) {
      this.dropdownBlockChangesSubscription.unsubscribe();
    }
  }

  protected subscribeToDropdownBlockLoad(): void {
    this.dropdownBlockLoadSubscription = this.dropdownActions.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (this.hooks && block.hooks.dropdownBlockDidLoad) {
            const dropdownBlockDidLoad = this.hooks[block.hooks.dropdownBlockDidLoad];
            if (dropdownBlockDidLoad) {
              dropdownBlockDidLoad(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockChanges(): void {
    this.dropdownBlockChangesSubscription = this.dropdownActions.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (this.hooks && block.hooks.dropdownBlockDidChange) {
            const dropdownBlockDidChange = this.hooks[block.hooks.dropdownBlockDidChange];
            if (dropdownBlockDidChange) {
              dropdownBlockDidChange(block, this.blockActions.getActions());
            }
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
