import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooksService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../../base/dynamic-form/dynamic-form.module";

import {
  CustomBlocksHooks,
  CustomBlocksMethods,
  CheckBoxConfirmerBlock,
} from "../models";

import { CustomBlockRulesService } from "./rules.service";
import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class CustomBlockHooksService extends BlockHooksService {
  blocksHooks: CustomBlocksHooks;

  constructor(protected logger: NGXLogger,
              protected blockRules: CustomBlockRulesService,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
    super(
      logger,
      blockRules,
      checkBoxService,
      dropdownService,
      textInputService,
    );
    this.startListenerForCustomBlocks();
  }

  startListenerForCustomBlocks(): void {
    this.listenToLoadCheckBoxConfirmerBlock();

    this.listenToCheckBoxConfirmerBlockChanges();
  }

  listenToLoadCheckBoxConfirmerBlock(): void {
    this.checkBoxConfirmerService.blockLoadObservable$
      .subscribe((block: CheckBoxConfirmerBlock) => {
        try {
          if (environment.evaluateScriptsFromServer) {
            // @ts-ignore
            businessMethods[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksMethods());
          } else {
            this.blocksHooks[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksMethods());
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
            businessMethods[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksMethods());
          } else {
            this.blocksHooks[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  protected blocksMethods(): CustomBlocksMethods {
    const methods = super.blocksMethods() as CustomBlocksMethods;
    methods.checkBoxConfirmer = this.checkBoxConfirmerService.getCheckBoxConfirmerMethods();
    return methods;
  }
}
