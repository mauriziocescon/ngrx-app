import { Component, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/map";

import { TranslateService } from "@ngx-translate/core";

import {
  modalAlertsActions,
  modalConfirmersActions,
  ModalAlert,
  ModalConfirmer,
  ModalConfirmerResultType,
} from "../../../../../core/core.module";

import * as fromB2Blocks from "../../../reducers";
import * as datePicker from "../../../actions/blocks/date-picker.actions";
import { B2BlockType, DatePickerBlock } from "../../../models";

import * as fromRoot from "../../../../../reducers";

@Component({
  selector: "ct-date-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-date-picker
      [block]="block$ | async"
      [loading]="loading$ | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-date-picker>`,
})
export class DatePickerContainerComponent implements OnDestroy {
  @Input() blockId: number;

  block$: Observable<DatePickerBlock>;
  datePickerBlock: DatePickerBlock;

  loading$: Observable<boolean>;

  protected modalConfirmerResults$: Observable<{ [id: string]: ModalConfirmerResultType }>;
  protected modalConfirmerResultSubscription: Subscription;

  constructor(protected store: Store<fromRoot.State>,
              protected translate: TranslateService) {
    this.block$ = this.store.select(fromB2Blocks.getAllDatePicker)
      .map((blocks: DatePickerBlock[]) => {
        return blocks.find((block: DatePickerBlock) => {
          return block.id === this.blockId;
        });
      })
      .map((block) => {
        return this.datePickerBlock = block;
      });

    this.loading$ = this.store.select(fromB2Blocks.getDatePickerBlocksLoadingState)
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
          type: B2BlockType.DatePicker,
          label: this.datePickerBlock.label,
          value: value,
          description: this.datePickerBlock.description,
          required: this.datePickerBlock.required,
          disabled: this.datePickerBlock.disabled,
          hooks: {
            ...this.datePickerBlock.hooks,
          },
        },
      },
      notify: true,
    };
    this.store.dispatch(new datePicker.UpdateBlock(block));
  }

  protected askForConfirmation(): void {
    this.subscribeToModalConfirmerResult();

    this.translate.get([
      "CONTAINER.DATE_PICKER.CONFIRMATION_MESSAGE",
      "CONTAINER.DATE_PICKER.CONFIRMATION_NO_BUTTON",
      "CONTAINER.DATE_PICKER.CONFIRMATION_TITLE",
      "CONTAINER.DATE_PICKER.CONFIRMATION_YES_BUTTON",
    ])
      .subscribe((translations: any) => {
        const modalConfirmer: ModalConfirmer = {
          id: this.blockId.toString(),
          title: translations["CONTAINER.DATE_PICKER.CONFIRMATION_TITLE"],
          message: translations["CONTAINER.DATE_PICKER.CONFIRMATION_MESSAGE"],
          yesButtonLabel: translations["CONTAINER.DATE_PICKER.CONFIRMATION_YES_BUTTON"],
          noButtonLabel: translations["CONTAINER.DATE_PICKER.CONFIRMATION_NO_BUTTON"],
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
              "CONTAINER.DATE_PICKER.ALERT_BUTTON",
              "CONTAINER.DATE_PICKER.ALERT_MESSAGE",
              "CONTAINER.DATE_PICKER.ALERT_TITLE",
            ])
              .subscribe((translations: any) => {
                const modalAlert: ModalAlert = {
                  id: this.blockId.toString(),
                  title: translations["CONTAINER.DATE_PICKER.ALERT_TITLE"],
                  message: translations["CONTAINER.DATE_PICKER.ALERT_MESSAGE"],
                  buttonLabel: translations["CONTAINER.DATE_PICKER.ALERT_BUTTON"],
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
