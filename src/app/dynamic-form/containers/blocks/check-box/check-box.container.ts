import { Component, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/find";
import "rxjs/add/operator/mergeMap";

import * as fromDynamicForm from "../../../reducers";
import * as checkBox from "../../../actions/blocks/check-box.actions";
import { BlockType, CheckBoxBlock } from "../../../models";

import * as fromRoot from "../../../../reducers";
import * as modalAlertsActions from "../../../../core/actions/modal-alert.actions";
import * as modalConfirmersActions from "../../../../core/actions/modal-confirmer.actions";

import { ModalAlert, ModalConfirmer } from "../../../../core/models";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-check-box
      [block]="block | async"
      (valueDidChange)="valueDidChange($event)">
    </cp-check-box>`,
})
export class CheckBoxContainerComponent implements OnDestroy {
  @Input() blockId: number;

  block: Observable<CheckBoxBlock>;

  protected valueToSave: boolean;

  protected modalConfirmerResults: Observable<{ [id: string]: boolean }>;
  protected modalConfirmerResultSubscription: any;
  protected modalConfirmerId = "1";

  constructor(protected store: Store<fromRoot.State>) {
    this.block = this.store.select(fromDynamicForm.getAllEditBlocks)
      .flatMap(blocks => blocks)
      .find((block: CheckBoxBlock) => {
        return block.id === this.blockId;
      });

    this.modalConfirmerResults = this.store.select(fromRoot.getModalConfirmerResults);
  }

  protected askForConfirmation(): void {
    this.subscribeToModalConfirmerResult();
    const modalConfirmer: ModalConfirmer = {
      id: this.modalConfirmerId,
      title: "Confirmer",
      message: "Are you sure about that?",
      yesButtonLabel: "Yes",
      noButtonLabel: "No",
    };
    this.store.dispatch(new modalConfirmersActions.ShowModalConfirmer({modal: modalConfirmer}));
  }

  valueDidChange(value: boolean): void {
    this.valueToSave = value;
    this.askForConfirmation();
  }

  protected subscribeToModalConfirmerResult(): void {
    if (this.modalConfirmerResultSubscription) {
      this.modalConfirmerResultSubscription.unsubscribe();
    }

    this.modalConfirmerResultSubscription = this.modalConfirmerResults
      .subscribe((modalConfirmerResult: { [id: string]: boolean }) => {
        if (modalConfirmerResult[this.modalConfirmerId] === true) {

          const block = {
            block: {
              id: this.blockId,
              changes: {
                id: this.blockId,
                type: BlockType.CheckBox,
                value: this.valueToSave,
              },
            }
          };
          this.store.dispatch(new checkBox.ValueDidChange(block));

          const modalAlert: ModalAlert = {
            id: "1",
            title: "Alert",
            message: "Done",
            buttonLabel: "Ok"
          };
          this.store.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
          this.modalConfirmerResultSubscription.unsubscribe();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.modalConfirmerResultSubscription) {
      this.modalConfirmerResultSubscription.unsubscribe();
    }
  }
}
