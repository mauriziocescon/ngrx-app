import { Injectable } from "@angular/core";

import { CheckBoxService } from "../blocks/check-box.service";
import { DropdownService } from "../blocks/dropdown.service";
import { TextInputService } from "../blocks/text-input.service";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../models";

import * as $ from "jquery";

@Injectable()
export class BlocksHooksService {
  blockHooksMethods: any;
  flag: boolean;

  constructor(protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService) {
    this.startListener();

    $.getScript("http://localhost:5000/rules/rules.js")
      .done(() => {
        // do nothing
      })
      .fail((jqxhr, settings, exception) => {
        // do nothing
      });

    // @ts-ignore
    import("../../../rules").then((funct: any) => {
      this.blockHooksMethods = funct;
    });
  }

  startListener(): void {
    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();
  }

  loadCheckBoxBlock(block: CheckBoxBlock): void {
    try {
      if (this.flag) {
        // @ts-ignore
        businessMethods.checkBoxBlockDidLoad(block, this.blocksMethods());
      } else {
        this.blockHooksMethods.checkBoxBlockDidLoad(block, this.blocksMethods());
      }
    } catch (e) {
      console.log(e);
    }
  }

  loadDropdownBlock(block: DropdownBlock): void {
    try {
      if (this.flag) {
        // @ts-ignore
        businessMethods.dropdownBlockDidLoad(block, this.blocksMethods());
      } else {
        this.blockHooksMethods.dropdownBlockDidLoad(block, this.blocksMethods());
      }
    } catch (e) {
      console.log(e);
    }
  }

  loadTextInputBlock(block: TextInputBlock): void {
    try {
      if (this.flag) {
        // @ts-ignore
        businessMethods.textInputBlockDidLoad(block, this.blocksMethods());
      } else {
        this.blockHooksMethods.textInputBlockDidLoad(block, this.blocksMethods());
      }
    } catch (e) {
      console.log(e);
    }
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          if (this.flag) {
            // @ts-ignore
            businessMethods.checkBoxBlockDidChange(block, this.blocksMethods());
          } else {
            this.blockHooksMethods.checkBoxBlockDidChange(block, this.blocksMethods());
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
          if (this.flag) {
            // @ts-ignore
            businessMethods.dropdownBlockDidChange(block, this.blocksMethods());
          } else {
            this.blockHooksMethods.dropdownBlockDidChange(block, this.blocksMethods());
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
          if (this.flag) {
            // @ts-ignore
            businessMethods.textInputBlockDidChange(block, this.blocksMethods());
          } else {
            this.blockHooksMethods.textInputBlockDidChange(block, this.blocksMethods());
          }
        } catch (e) {
          console.log(e);
        }
      });
  }

  protected blocksMethods(): any {
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
