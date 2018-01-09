import { Component, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/find";
import "rxjs/add/operator/mergeMap";

import { TranslateService } from "@ngx-translate/core";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/check-box.actions";
import { BlockType, CheckBoxBlock } from "../../../models";

import * as fromRoot from "../../../../reducers";
import * as modalAlertsActions from "../../../../core/actions/modal-alert.actions";
import * as modalConfirmersActions from "../../../../core/actions/modal-confirmer.actions";

import { ModalAlert, ModalConfirmer, ModalConfirmerResultType } from "../../../../core/models";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box
      [block]="block$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent implements OnDestroy {
  @Input() blockId: number;

  block$: Observable<CheckBoxBlock>;
  checkBoxBlock: CheckBoxBlock;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected store: Store<fromRoot.State>,
              protected translate: TranslateService) {
    this.block$ = this.store.select(fromDynamicForm.getAllEditBlocks)
      .map((blocks: CheckBoxBlock[]) => {
        return blocks.find((block: CheckBoxBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.checkBoxBlock = block;
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
    const valid = this.checkBoxBlock.required ? value : true;
    const block = {
      block: {
        id: this.blockId,
        changes: {
          id: this.blockId,
          type: BlockType.CheckBox,
          value: value,
          valid: valid,
        },
      }
    };
    this.store.dispatch(new checkBox.ValueDidChange(block));
  }

  protected askForConfirmation(): void {
    this.subscribeToModalConfirmerResult();

    this.translate.get([
      "CONTAINER.CHECK_BOX.CONFIRMATION_MESSAGE",
      "CONTAINER.CHECK_BOX.CONFIRMATION_NO_BUTTON",
      "CONTAINER.CHECK_BOX.CONFIRMATION_TITLE",
      "CONTAINER.CHECK_BOX.CONFIRMATION_YES_BUTTON",
    ])
      .subscribe((translations: any) => {
        const modalConfirmer: ModalConfirmer = {
          id: this.blockId.toString(),
          title: translations["CONTAINER.CHECK_BOX.CONFIRMATION_TITLE"],
          message: translations["CONTAINER.CHECK_BOX.CONFIRMATION_MESSAGE"],
          yesButtonLabel: translations["CONTAINER.CHECK_BOX.CONFIRMATION_YES_BUTTON"],
          noButtonLabel: translations["CONTAINER.CHECK_BOX.CONFIRMATION_NO_BUTTON"],
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
              "CONTAINER.CHECK_BOX.ALERT_BUTTON",
              "CONTAINER.CHECK_BOX.ALERT_MESSAGE",
              "CONTAINER.CHECK_BOX.ALERT_TITLE",
            ])
              .subscribe((translations: any) => {
                const modalAlert: ModalAlert = {
                  id: this.blockId.toString(),
                  title: translations["CONTAINER.CHECK_BOX.ALERT_TITLE"],
                  message: translations["CONTAINER.CHECK_BOX.ALERT_MESSAGE"],
                  buttonLabel: translations["CONTAINER.CHECK_BOX.ALERT_BUTTON"],
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
