import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  DropdownBlock,
} from "../../../../models";

import { DropdownActionsService } from "./dropdown-actions.service";

import { BlockActionsIntegrationService } from "../../../integration";

@Injectable()
export class DropdownHooksTriggerService {
  protected hooks: BlocksHooks | {};

  protected dropdownBlockLoadSubscription: Subscription;
  protected dropdownBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blockActionsService: BlockActionsIntegrationService,
              protected dropdownActionsService: DropdownActionsService) {
  }

  subscribeAll(hooks: BlocksHooks): void {
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
    this.dropdownBlockLoadSubscription = this.dropdownActionsService.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          const dropdownBlockDidLoad = this.hooks[block.hooks.dropdownBlockDidLoad];
          if (dropdownBlockDidLoad) {
            dropdownBlockDidLoad(block, this.blockActionsService.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockChanges(): void {
    this.dropdownBlockChangesSubscription = this.dropdownActionsService.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          const dropdownBlockDidChange = this.hooks[block.hooks.dropdownBlockDidChange];
          if (dropdownBlockDidChange) {
            dropdownBlockDidChange(block, this.blockActionsService.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
