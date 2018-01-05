import { Injectable } from "@angular/core";

import { CheckBoxService } from "../blocks/check-box.service";
import { DropdownService } from "../blocks/dropdown.service";
import { TextInputService } from "../blocks/text-input.service";

import { CheckBoxBlock, DropdownBlock, TextInputBlock } from "../../models";

@Injectable()
export class BlocksHooksService {

  constructor(protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService) {
    this.startListener();
  }

  loadCheckBoxBlock(block: CheckBoxBlock): void {
    console.log(`loadCheckBoxBlock: ${JSON.stringify(block)}`);
  }

  loadDropdownBlock(block: DropdownBlock): void {
    console.log(`loadDropdownBlock: ${JSON.stringify(block)}`);
  }

  loadTextInputBlock(block: TextInputBlock): void {
    console.log(`loadTextInputBlock: ${JSON.stringify(block)}`);
  }

  startListener(): void {
    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockObservable
      .subscribe((block: CheckBoxBlock) => {
        console.log(`listenToCheckBoxBlockChanges: ${JSON.stringify(block)}`);
      }, (err: any) => {
      });
  }

  listenToDropdownBlockChanges(): void {
    this.dropdownService.blockObservable
      .subscribe((block: DropdownBlock) => {
        console.log(`listenToDropdownBlockChanges: ${JSON.stringify(block)}`);
      }, (err: any) => {
      });
  }

  listenToTextInputBlockChanges(): void {
    this.textInputService.blockObservable
      .subscribe((block: TextInputBlock) => {
        console.log(`listenToTextInputBlockChanges: ${JSON.stringify(block)}`);
      }, (err: any) => {
      });
  }
}
