import { Component, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/map";

import { TranslateService } from "@ngx-translate/core";

import {
  ModalConfirmer,
  ModalConfirmerResultType,
} from "../../../../core/core.module";

import { B1BlockType, CheckBoxConfirmerBlock } from "../../../models";

import { CheckBoxConfirmerStoreService } from "./check-box-confirmer-store.service";

@Component({
  selector: "ct-check-box-confirmer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CheckBoxConfirmerStoreService,
  ],
  template: `
    <cp-check-box-confirmer
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box-confirmer>`,
})
export class CheckBoxConfirmerContainerComponent implements OnDestroy {
  @Input() blockId: number;

  block$: Observable<CheckBoxConfirmerBlock | undefined>;
  checkBoxConfirmerBlock: CheckBoxConfirmerBlock | undefined;

  loading$: Observable<boolean>;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected checkBoxConfirmerStore: CheckBoxConfirmerStoreService,
              protected translate: TranslateService) {
    this.block$ = this.checkBoxConfirmerStore.getAllCheckBoxConfirmer()
      .map((blocks: CheckBoxConfirmerBlock[]) => {
        return blocks.find((block: CheckBoxConfirmerBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.checkBoxConfirmerBlock = block;
      });

    this.loading$ = this.checkBoxConfirmerStore.getCheckBoxConfirmerBlocksLoading()
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });

    this.modalConfirmerResults$ = this.checkBoxConfirmerStore.getModalConfirmerResults();
  }

  valueDidChange(value: boolean): void {
    if (value === true) {
      this.askForConfirmation();
    } else {
      this.dispatchValueDidChangeAction(value);
    }
  }

  protected dispatchValueDidChangeAction(value: boolean): void {
    if (this.checkBoxConfirmerBlock) {
      const block = {
        block: {
          id: this.blockId,
          changes: {
            id: this.blockId,
            type: B1BlockType.CheckBoxConfirmer,
            label: this.checkBoxConfirmerBlock.label,
            value: value,
            description: this.checkBoxConfirmerBlock.description,
            required: this.checkBoxConfirmerBlock.required,
            disabled: this.checkBoxConfirmerBlock.disabled,
            hooks: {
              ...this.checkBoxConfirmerBlock.hooks,
            },
          },
        },
        notify: true,
      };
      this.checkBoxConfirmerStore.dispatchUpdateBlock(block);
    }
  }

  protected askForConfirmation(): void {
    this.subscribeToModalConfirmerResult();

    this.translate.get([
      "CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_MESSAGE",
      "CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_NO_BUTTON",
      "CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_TITLE",
      "CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_YES_BUTTON",
    ])
      .subscribe((translations: any) => {
        const modalConfirmer: ModalConfirmer = {
          id: this.blockId.toString(),
          title: translations["CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_TITLE"],
          message: translations["CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_MESSAGE"],
          yesButtonLabel: translations["CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_YES_BUTTON"],
          noButtonLabel: translations["CONTAINER.CHECK_BOX_CONFIRMER.CONFIRMATION_NO_BUTTON"],
        };
        this.checkBoxConfirmerStore.dispatchShowModalConfirmer(modalConfirmer);
      });
  }

  protected subscribeToModalConfirmerResult(): void {
    this.unsubscribeToModalConfirmerResult();

    this.modalConfirmerResultSubscription = this.modalConfirmerResults$
      .subscribe((modalConfirmerResult: { [id: string]: ModalConfirmerResultType }) => {
        const result = modalConfirmerResult[this.blockId.toString()];

        if (result) {
          this.checkBoxConfirmerStore.dispatchCleanModalConfirmer({id: this.blockId.toString()});
          this.unsubscribeToModalConfirmerResult();

          if (result === ModalConfirmerResultType.Positive) {
            this.dispatchValueDidChangeAction(true);
          } else {
            this.dispatchValueDidChangeAction(false);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeToModalConfirmerResult();
  }

  protected unsubscribeToModalConfirmerResult(): void {
    if (this.modalConfirmerResultSubscription) {
      this.modalConfirmerResultSubscription.unsubscribe();
    }
  }
}
