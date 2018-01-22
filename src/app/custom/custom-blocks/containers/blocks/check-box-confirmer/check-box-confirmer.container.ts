import { Component, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/map";

import { TranslateService } from "@ngx-translate/core";

import * as fromCustomBlocks from "../../../reducers";
import * as checkBoxConfirmer from "../../../actions/blocks/check-box-confirmer.actions";
import { CustomBlockType, CheckBoxConfirmerBlock } from "../../../models";

import * as fromRoot from "../../../../../reducers";
import * as modalAlertsActions from "../../../../../core/actions/modal-alert.actions";
import * as modalConfirmersActions from "../../../../../core/actions/modal-confirmer.actions";

import { ModalAlert, ModalConfirmer, ModalConfirmerResultType } from "../../../../../core/models";

@Component({
  selector: "ct-check-box-confirmer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box-confirmer
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box-confirmer>`,
})
export class CheckBoxConfirmerContainerComponent implements OnDestroy {
  @Input() blockId: number;

  block$: Observable<CheckBoxConfirmerBlock>;
  checkBoxConfirmerBlock: CheckBoxConfirmerBlock;

  loading$: Observable<boolean>;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected store: Store<fromRoot.State>,
              protected translate: TranslateService) {
    this.block$ = this.store.select(fromCustomBlocks.getAllCheckBoxConfirmer)
      .map((blocks: CheckBoxConfirmerBlock[]) => {
        return blocks.find((block: CheckBoxConfirmerBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.checkBoxConfirmerBlock = block;
      });

    this.loading$ = this.store.select(fromCustomBlocks.getCheckBoxConfirmerBlocksLoadingState)
      .map((blocksLoading: { [id: string]: boolean }) => {
        return blocksLoading[this.blockId];
      });

    this.modalConfirmerResults$ = this.store.select(fromRoot.getModalConfirmerResults);
  }

  valueDidChange(value: boolean): void {
    if (value === true) {
      this.askForConfirmation();
    } else {
      this.dispatchValueDidChangeAction(value);
    }
  }

  protected dispatchValueDidChangeAction(value: boolean): void {
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: CustomBlockType.CheckBoxConfirmer,
          label: this.checkBoxConfirmerBlock.label,
          value: value,
          description: this.checkBoxConfirmerBlock.description,
          required: this.checkBoxConfirmerBlock.required,
          disabled: this.checkBoxConfirmerBlock.disabled,
        },
      },
      notify: true,
    };
    this.store.dispatch(new checkBoxConfirmer.UpdateBlock(block));
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
        this.store.dispatch(new modalConfirmersActions.ShowModalConfirmer({modal: modalConfirmer}));
      });
  }

  protected subscribeToModalConfirmerResult(): void {
    this.unsubscribeToModalConfirmerResult();

    this.modalConfirmerResultSubscription = this.modalConfirmerResults$
      .subscribe((modalConfirmerResult: { [id: string]: ModalConfirmerResultType }) => {
        const result = modalConfirmerResult[this.blockId.toString()];

        if (result) {
          this.store.dispatch(new modalConfirmersActions.CleanModalConfirmer({id: this.blockId.toString()}));
          this.unsubscribeToModalConfirmerResult();

          if (result === ModalConfirmerResultType.Positive) {
            this.dispatchValueDidChangeAction(true);

            this.translate.get([
              "CONTAINER.CHECK_BOX_CONFIRMER.ALERT_BUTTON",
              "CONTAINER.CHECK_BOX_CONFIRMER.ALERT_MESSAGE",
              "CONTAINER.CHECK_BOX_CONFIRMER.ALERT_TITLE",
            ])
              .subscribe((translations: any) => {
                const modalAlert: ModalAlert = {
                  id: this.blockId.toString(),
                  title: translations["CONTAINER.CHECK_BOX_CONFIRMER.ALERT_TITLE"],
                  message: translations["CONTAINER.CHECK_BOX_CONFIRMER.ALERT_MESSAGE"],
                  buttonLabel: translations["CONTAINER.CHECK_BOX_CONFIRMER.ALERT_BUTTON"],
                };
                this.store.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
              });
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
