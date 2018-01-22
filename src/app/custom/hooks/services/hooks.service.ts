import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { NGXLogger } from "ngx-logger";

import {
  CheckBoxService,
  DropdownService,
  TextInputService
} from "../../../base/dynamic-form/services";

import {
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../../base/dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerService } from "../../custom-blocks/services";

import { BlocksHooks, BlocksMethods } from "../models";
import { BlockRulesService } from "./rules.service";

import { environment } from "../../../../environments/environment";
import { CheckBoxConfirmerBlock } from "../../custom-blocks/models";

@Injectable()
export class BlockHooksService {
  blocksHooks: BlocksHooks;

  constructor(protected logger: NGXLogger,
              protected blockRules: BlockRulesService,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
    this.startListener();
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

    this.listenToLoadCheckBoxConfirmerBlock();

    this.listenToCheckBoxBlockChanges();
    this.listenToDropdownBlockChanges();
    this.listenToTextInputBlockChanges();

    this.listenToCheckBoxConfirmerBlockChanges();
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
            businessMethods.dropdownBlockDidLoad(block, this.blocksMethods());
          } else {
            this.blocksHooks.dropdownBlockDidLoad(block, this.blocksMethods());
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
            businessMethods.textInputBlockDidLoad(block, this.blocksMethods());
          } else {
            this.blocksHooks.textInputBlockDidLoad(block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToLoadCheckBoxConfirmerBlock(): void {
    this.checkBoxConfirmerService.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods.checkBoxBlockCofirmerDidLoad(block, this.blocksMethods());
          } else {
            this.blocksHooks.checkBoxConfirmerBlockDidLoad(block, this.blocksMethods());
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
            businessMethods.checkBoxBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.checkBoxBlockDidChange(block, this.blocksMethods());
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
            businessMethods.dropdownBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.dropdownBlockDidChange(block, this.blocksMethods());
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
            businessMethods.textInputBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.textInputBlockDidChange(block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  listenToCheckBoxConfirmerBlockChanges(): void {
    this.checkBoxConfirmerService.blockChangesObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods.checkBoxConfirmerBlockDidChange(block, this.blocksMethods());
          } else {
            this.blocksHooks.checkBoxConfirmerBlockDidChange(block, this.blocksMethods());
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
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerService.getCheckBoxConfirmerMethods(),
      },
    };
  }
}
