import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../../models";

import { CheckBoxActionsService } from "./check-box-actions.service";
import { DropdownActionsService } from "./dropdown-actions.service";
import { TextInputActionsService } from "./text-input-actions.service";

import { BlocksActionsService } from "./block-actions.service";

@Injectable()
export class BlockHooksTriggerService {
  protected hooks: BlocksHooks;

  protected checkBoxBlockLoadSubscription: Subscription;
  protected dropdownBlockLoadSubscription: Subscription;
  protected textInputBlockLoadSubscription: Subscription;

  protected checkBoxBlockChangesSubscription: Subscription;
  protected dropdownBlockChangesSubscription: Subscription;
  protected textInputBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blocksActionsService: BlocksActionsService,
              protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService) {
  }

  subscribeAll(hooks: BlocksHooks): void {
    this.hooks = hooks;

    this.subscribeToCheckBoxBlockLoad();
    this.subscribeToDropdownBlockLoad();
    this.subscribeToTextInputBlockLoad();

    this.subscribeToCheckBoxBlockChanges();
    this.subscribeToDropdownBlockChanges();
    this.subscribeToTextInputBlockChanges();
  }

  unsubscribeAll(): void {
    this.hooks = undefined;

    if (this.checkBoxBlockLoadSubscription) {
      this.checkBoxBlockLoadSubscription.unsubscribe();
    }
    if (this.dropdownBlockLoadSubscription) {
      this.dropdownBlockLoadSubscription.unsubscribe();
    }
    if (this.textInputBlockLoadSubscription) {
      this.textInputBlockLoadSubscription.unsubscribe();
    }

    if (this.checkBoxBlockChangesSubscription) {
      this.checkBoxBlockChangesSubscription.unsubscribe();
    }
    if (this.dropdownBlockChangesSubscription) {
      this.dropdownBlockChangesSubscription.unsubscribe();
    }
    if (this.textInputBlockChangesSubscription) {
      this.textInputBlockChangesSubscription.unsubscribe();
    }
  }

  protected subscribeToCheckBoxBlockLoad(): void {
    this.checkBoxBlockLoadSubscription = this.checkBoxService.blockLoadObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          this.hooks[block.hooks.checkBoxBlockDidLoad](block, this.blocksActionsService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockLoad(): void {
    this.dropdownBlockLoadSubscription = this.dropdownService.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          this.hooks[block.hooks.dropdownBlockDidLoad](block, this.blocksActionsService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToTextInputBlockLoad(): void {
    this.textInputBlockLoadSubscription = this.textInputService.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          this.hooks[block.hooks.textInputBlockDidLoad](block, this.blocksActionsService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxBlockChanges(): void {
    this.checkBoxBlockChangesSubscription = this.checkBoxService.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          this.hooks[block.hooks.checkBoxBlockDidChange](block, this.blocksActionsService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockChanges(): void {
    this.dropdownBlockChangesSubscription = this.dropdownService.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          this.hooks[block.hooks.dropdownBlockDidChange](block, this.blocksActionsService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToTextInputBlockChanges(): void {
    this.textInputBlockChangesSubscription = this.textInputService.blockChangesObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          this.hooks[block.hooks.textInputBlockDidChange](block, this.blocksActionsService.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
