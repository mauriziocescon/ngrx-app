import { Injectable } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  BlocksMethods,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../models";

import { CheckBoxActionsService } from "./blocks/check-box-actions.service";
import { DropdownActionsService } from "./blocks/dropdown-actions.service";
import { TextInputActionsService } from "./blocks/text-input-actions.service";

@Injectable()
export class BlockHooksService {
  protected hooks: BlocksHooks;
  protected module: string;
  protected step: string;

  protected checkBoxBlockLoadSubscription: Subscription;
  protected dropdownBlockLoadSubscription: Subscription;
  protected textInputBlockLoadSubscription: Subscription;

  protected checkBoxBlockChangesSubscription: Subscription;
  protected dropdownBlockChangesSubscription: Subscription;
  protected textInputBlockChangesSubscription: Subscription;

  constructor(protected logger: NGXLogger,
              protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService) {
  }

  setupHooks(hooks: BlocksHooks, module?: string, step?: string): void {
    this.unsubscribeAll();

    this.hooks = hooks;
    this.module = module;
    this.step = step;

    this.subscribeToCheckBoxBlockLoad();
    this.subscribeToDropdownBlockLoad();
    this.subscribeToTextInputBlockLoad();

    this.subscribeToCheckBoxBlockChanges();
    this.subscribeToDropdownBlockChanges();
    this.subscribeToTextInputBlockChanges();
  }

  protected unsubscribeAll(): void {
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

  subscribeToCheckBoxBlockLoad(): void {
    this.checkBoxBlockLoadSubscription = this.checkBoxService.blockLoadObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          this.hooks[block.hooks.checkBoxBlockDidLoad](block, this.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToDropdownBlockLoad(): void {
    this.dropdownBlockLoadSubscription = this.dropdownService.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          this.hooks[block.hooks.dropdownBlockDidLoad](block, this.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToTextInputBlockLoad(): void {
    this.textInputBlockLoadSubscription = this.textInputService.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          this.hooks[block.hooks.textInputBlockDidLoad](block, this.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToCheckBoxBlockChanges(): void {
    this.checkBoxBlockChangesSubscription = this.checkBoxService.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          this.hooks[block.hooks.checkBoxBlockDidChange](block, this.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToDropdownBlockChanges(): void {
    this.dropdownBlockChangesSubscription = this.dropdownService.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          this.hooks[block.hooks.dropdownBlockDidChange](block, this.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  subscribeToTextInputBlockChanges(): void {
    this.textInputBlockChangesSubscription = this.textInputService.blockChangesObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          this.hooks[block.hooks.textInputBlockDidChange](block, this.getActions());
        } catch (e) {
          this.logger.error(e.toString());
        }
      });
  }

  getSetOfRules(module: string, name: string): any {
    return {};
  }

  getHooks(): BlocksHooks {
    return this.hooks;
  }

  getActions(): BlocksMethods {
    return {
      checkBox: {
        ...this.checkBoxService.getCheckBoxMethods(),
      },
      dropdown: {
        ...this.dropdownService.getDropdownMethods(),
      },
      textInput: {
        ...this.textInputService.getTextInputMethods(),
      },
    };
  }
}
