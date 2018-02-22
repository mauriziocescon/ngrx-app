import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../../../models";

import { CheckBoxActionsService } from "./check-box-actions.service";
import { DropdownActionsService } from "./dropdown-actions.service";
import { TextInputActionsService } from "./text-input-actions.service";

import { BlockActionsIntegrationService } from "../../../integration";

@Injectable()
export class BlockHooksTriggerService {
  protected hooks: BlocksHooks | {};

  protected checkBoxBlockLoadSubscription: Subscription;
  protected dropdownBlockLoadSubscription: Subscription;
  protected textInputBlockLoadSubscription: Subscription;

  protected checkBoxBlockChangesSubscription: Subscription;
  protected dropdownBlockChangesSubscription: Subscription;
  protected textInputBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected blocksActions: BlockActionsIntegrationService,
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
          const checkBoxBlockDidLoad = this.hooks[block.hooks.checkBoxBlockDidLoad];
          if (checkBoxBlockDidLoad) {
            checkBoxBlockDidLoad(block, this.blocksActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockLoad(): void {
    this.dropdownBlockLoadSubscription = this.dropdownService.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          const dropdownBlockDidLoad = this.hooks[block.hooks.dropdownBlockDidLoad];
          if (dropdownBlockDidLoad) {
            dropdownBlockDidLoad(block, this.blocksActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToTextInputBlockLoad(): void {
    this.textInputBlockLoadSubscription = this.textInputService.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          const textInputBlockDidLoad = this.hooks[block.hooks.textInputBlockDidLoad];
          if (textInputBlockDidLoad) {
            textInputBlockDidLoad(block, this.blocksActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToCheckBoxBlockChanges(): void {
    this.checkBoxBlockChangesSubscription = this.checkBoxService.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          const checkBoxBlockDidChange = this.hooks[block.hooks.checkBoxBlockDidChange];
          if (checkBoxBlockDidChange) {
            checkBoxBlockDidChange(block, this.blocksActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToDropdownBlockChanges(): void {
    this.dropdownBlockChangesSubscription = this.dropdownService.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          const dropdownBlockDidChange = this.hooks[block.hooks.dropdownBlockDidChange];
          if (dropdownBlockDidChange) {
            dropdownBlockDidChange(block, this.blocksActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  protected subscribeToTextInputBlockChanges(): void {
    this.textInputBlockChangesSubscription = this.textInputService.blockChangesObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          const textInputBlockDidChange = this.hooks[block.hooks.textInputBlockDidChange];
          if (textInputBlockDidChange) {
            textInputBlockDidChange(block, this.blocksActions.getActions());
          }
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }
}
