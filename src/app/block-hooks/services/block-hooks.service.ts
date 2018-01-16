import { Injectable } from "@angular/core";

import { BlocksHooks, BlocksMethods } from "../models";

import { CheckBoxService } from "../../dynamic-form/services/blocks/check-box.service";
import { DropdownService } from "../../dynamic-form/services/blocks/dropdown.service";
import { TextInputService } from "../../dynamic-form/services/blocks/text-input.service";

import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../dynamic-form/models";

import { environment } from "../../../environments/environment";

import * as $ from "jquery";

@Injectable()
export class BlockHooksService {
  blocksHooks: BlocksHooks;

  constructor(protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService) {
    this.startListener();

    if (environment.evaluateScriptsFromServer) {
      $.getScript(environment.rulesUrl + "rules.js")
        .done(() => {
          // do nothing
        })
        .fail((jqxhr, settings, exception) => {
          // do nothing
        });
    } else {
      import("../../rules/rules").then((hooks: BlocksHooks) => {
        this.blocksHooks = hooks;
      });
    }
  }

  startListener(): void {
    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();
  }

  loadCheckBoxBlock(block: CheckBoxBlock): void {
    try {
      if (environment.evaluateScriptsFromServer) {
        // @ts-ignore
        businessMethods.checkBoxBlockDidLoad(block, this.blocksMethods());
      } else {
        this.blocksHooks.checkBoxBlockDidLoad(block, this.blocksMethods());
      }
    } catch (e) {
      console.log(e);
    }
  }

  loadDropdownBlock(block: DropdownBlock): void {
    try {
      if (environment.evaluateScriptsFromServer) {
        // @ts-ignore
        businessMethods.dropdownBlockDidLoad(block, this.blocksMethods());
      } else {
        this.blocksHooks.dropdownBlockDidLoad(block, this.blocksMethods());
      }
    } catch (e) {
      console.log(e);
    }
  }

  loadTextInputBlock(block: TextInputBlock): void {
    try {
      if (environment.evaluateScriptsFromServer) {
        // @ts-ignore
        businessMethods.textInputBlockDidLoad(block, this.blocksMethods());
      } else {
        this.blocksHooks.textInputBlockDidLoad(block, this.blocksMethods());
      }
    } catch (e) {
      console.log(e);
    }
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods.checkBoxBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.checkBoxBlockDidChange(block, this.blocksMethods());
          }
        } catch (e) {
          console.log(e);
        }
      });
  }

  listenToDropdownBlockChanges(): void {
    this.dropdownService.blockObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods.dropdownBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.dropdownBlockDidChange(block, this.blocksMethods());
          }
        } catch (e) {
          console.log(e);
        }
      });
  }

  listenToTextInputBlockChanges(): void {
    this.textInputService.blockObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods.textInputBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.textInputBlockDidChange(block, this.blocksMethods());
          }
        } catch (e) {
          console.log(e);
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
