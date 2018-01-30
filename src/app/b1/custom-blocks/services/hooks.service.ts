import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  B1BlocksHooks,
  B1BlocksMethods,
  CheckBoxConfirmerBlock,
} from "../models";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class B1BlockHooksService {
  hooks: B1BlocksHooks;

  constructor(protected logger: NGXLogger,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
    this.startListenerForB1Blocks();
  }

  startListenerForB1Blocks(): void {
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

  protected blocksMethods(): B1BlocksMethods {
    return {
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerService.getCheckBoxConfirmerMethods(),
      }
    };
  }
}
