import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import {
  CheckBoxService,
  DropdownService,
  TextInputService
} from "../../../base/dynamic-form/services";

import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../../base/dynamic-form/models";

import { BlocksHooks, BlocksMethods } from "../models";
import { BlockRulesService } from "./rules.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class BlockHooksService {
  blocksHooks: BlocksHooks;

  constructor(protected blockRules: BlockRulesService,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService) {
    this.startListener();
    this.fetchRules();
  }

  fetchRules(): Observable<any> | BlocksHooks {
    if (environment.evaluateScriptsFromServer) {
      return this.blockRules.getRulesFromScript();
    } else {
      this.blockRules.getRules()
        .subscribe((hooks: BlocksHooks) => {
          return this.blocksHooks = hooks;
        }, (error: any) => {
          return {};
        });
    }
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
            businessMethods.checkBoxBlockDidLoad(block, this.blocksMethods());
          } else {
            this.blocksHooks.checkBoxBlockDidLoad(block, this.blocksMethods());
          }
        } catch (e) {
          console.log(e);
        }
      });
  }

  listenToLoadDropdownBlock(): void {
    this.dropdownService.blockLoadObservable$
      .subscribe((block: DropdownBlock) => {
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
      });
  }

  listenToLoadTextInputBlock(): void {
    this.textInputService.blockLoadObservable$
      .subscribe((block: TextInputBlock) => {
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
      });
  }

  listenToCheckBoxBlockChanges(): void {
    this.checkBoxService.blockChangesObservable$
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
    this.dropdownService.blockChangesObservable$
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
    this.textInputService.blockChangesObservable$
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
