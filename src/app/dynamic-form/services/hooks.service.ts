import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlocksHooks,
  BlocksMethods,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../models";

import { CheckBoxService } from "./blocks/check-box.service";
import { DropdownService } from "./blocks/dropdown.service";
import { TextInputService } from "./blocks/text-input.service";

import { environment } from "../../../environments/environment";

@Injectable()
export class BlockHooksService {
  hooks: BlocksHooks;

  constructor(protected logger: NGXLogger,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService) {
    this.startListener();
  }

  startListener(): void {
    this.listenToLoadCheckBoxBlock();
    this.listenToLoadDropdownBlock();
    this.listenToLoadTextInputBlock();

    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();
  }

  listenToLoadCheckBoxBlock(): void {
    this.checkBoxService.blockLoadObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.checkBoxBlockDidLoad](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.checkBoxBlockDidLoad](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToLoadDropdownBlock(): void {
    this.dropdownService.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.dropdownBlockDidLoad](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.dropdownBlockDidLoad](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToLoadTextInputBlock(): void {
    this.textInputService.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.textInputBlockDidLoad](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.textInputBlockDidLoad](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockChangesObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.checkBoxBlockDidChange](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.checkBoxBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToDropdownBlockChanges(): void {
    this.dropdownService.blockChangesObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.dropdownBlockDidChange](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.dropdownBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToTextInputBlockChanges(): void {
    this.textInputService.blockChangesObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.textInputBlockDidChange](block, this.blocksMethods());
          } else {
            this.hooks[block.hooks.textInputBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  protected blocksMethods(): BlocksMethods {
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
