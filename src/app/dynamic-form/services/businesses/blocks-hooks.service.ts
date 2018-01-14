import { Injectable } from "@angular/core";

import { CheckBoxService } from "../blocks/check-box.service";
import { DropdownService } from "../blocks/dropdown.service";
import { TextInputService } from "../blocks/text-input.service";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../models";

import * as $ from "jquery";

@Injectable()
export class BlocksHooksService {

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
  }

  startListener(): void {
    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();
  }

  loadCheckBoxBlock(block: CheckBoxBlock): void {
    try {
      // @ts-ignore
      businessMethods.checkBoxBlockDidLoad(block, this.blocksMethods());
    } catch (e) {
      console.log(e);
    }
  }

  loadDropdownBlock(block: DropdownBlock): void {
    try {
      // @ts-ignore
      businessMethods.dropdownBlockDidLoad(block, this.blocksMethods());
    } catch (e) {
      console.log(e);
    }
  }

  loadTextInputBlock(block: TextInputBlock): void {
    try {
      // @ts-ignore
      businessMethods.textInputBlockDidLoad(block, this.blocksMethods());
    } catch (e) {
      console.log(e);
    }
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockObservable$
      .subscribe((block: CheckBoxBlock) => {
        try {
          // @ts-ignore
          businessMethods.checkBoxBlockDidChange(block, this.blocksMethods());
        } catch (e) {
          console.log(e);
        }
      });
  }

  listenToDropdownBlockChanges(): void {
    this.dropdownService.blockObservable$
      .subscribe((block: DropdownBlock) => {
        try {
          // @ts-ignore
          businessMethods.dropdownBlockDidChange(block, this.blocksMethods());
        } catch (e) {
          console.log(e);
        }
      });
  }

  listenToTextInputBlockChanges(): void {
    this.textInputService.blockObservable$
      .subscribe((block: TextInputBlock) => {
        try {
          // @ts-ignore
          businessMethods.textInputBlockDidChange(block, this.blocksMethods());
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
