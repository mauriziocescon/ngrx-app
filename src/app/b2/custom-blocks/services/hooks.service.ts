import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooksService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../../dynamic-form/dynamic-form.module";

import {
  B2BlocksHooks,
  B2BlocksMethods,
  CheckBoxConfirmerBlock,
} from "../models";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class B2BlockHooksService extends BlockHooksService {
  hooks: B2BlocksHooks;

  constructor(protected logger: NGXLogger,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
    super(
      logger,
      checkBoxService,
      dropdownService,
      textInputService,
    );
    this.startListenerForB2Blocks();
  }

  startListenerForB2Blocks(): void {
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
            this.hooks[block.hooks.checkBoxConfirmerBlockDidLoad](block, this.blocksMethods());
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
            this.hooks[block.hooks.checkBoxConfirmerBlockDidChange](block, this.blocksMethods());
          }
        } catch (e) {
          this.logger.error(e);
        }
      });
  }

  protected blocksMethods(): B2BlocksMethods {
    const methods = super.blocksMethods() as B2BlocksMethods;
    methods.checkBoxConfirmer = this.checkBoxConfirmerService.getCheckBoxConfirmerMethods();
    return methods;
  }
}
