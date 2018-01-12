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

    // $.getScript("http://localhost:5000/rules/rules.js")
    //   .done(() => {
    //   })
    //   .fail((jqxhr, settings, exception) => {
    //   });
  }

  startListener(): void {
    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();
  }

  loadCheckBoxBlock(block: CheckBoxBlock): void {
    // console.log(`loadCheckBoxBlock: ${JSON.stringify(block)}`);
  }

  loadDropdownBlock(block: DropdownBlock): void {
    // console.log(`loadDropdownBlock: ${JSON.stringify(block)}`);
  }

  loadTextInputBlock(block: TextInputBlock): void {
    this.textInputService.setValueForBlockId("Reset initial value during TextInput load event", block.id);
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockObservable$
      .subscribe((block: CheckBoxBlock) => {
        if (block.value === true) {
          // this.textInputService.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 1);
        }
      }, (err: any) => {
      });
  }

  listenToDropdownBlockChanges(): void {
    this.dropdownService.blockObservable$
      .subscribe((block: DropdownBlock) => {
        // this.textInputService.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 1);

        // @ts-ignore
        // businessMethods.example();

        // this.textInputService.changeLoading(true, 0);
        // setTimeout(() => {
        //   this.textInputService.changeLoading(false, 0);
        // }, 3000);
      }, (err: any) => {
      });
  }

  listenToTextInputBlockChanges(): void {
    this.textInputService.blockObservable$
      .subscribe((block: TextInputBlock) => {
        // do nothing
      }, (err: any) => {
      });
  }

  protected getSharedObject(): any {
    return {
      checkBox: {
        changeLoading: (loading: boolean, blockId: number) => this.checkBoxService.changeLoading(loading, blockId),
        setLabelForBlockId: (label: string, blockId: number) => this.checkBoxService.setLabelForBlockId(label, blockId),
        setValueForBlockId: (value: boolean, blockId: number) => this.checkBoxService.setValueForBlockId(value, blockId),
        setDescriptionForBlockId: (description: string, blockId: number) => this.checkBoxService.setDescriptionForBlockId(description, blockId),
        setRequiredForBlockId: (required: boolean, blockId: number) =>
      }


    };
  }
}
