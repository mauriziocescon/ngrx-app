import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { ModalAlertComponent } from "../components/modal-alert/modal-alert.component";
import { ModalConfirmerComponent } from "../components/modal-confirmer/modal-confirmer.component";

import { UpdateModal, DeleteModal } from "../actions/modals.actions";
import { ModalAlert, ModalConfirmer } from "../models";

@Injectable()
export class UIUtilitiesService {

  constructor(private modalService: NgbModal) {
  }

  modalAlert(modalAlert: ModalAlert): Promise<Action> {
    const modalRef = this.modalService.open(ModalAlertComponent);
    modalRef.componentInstance.title = modalAlert.title;
    modalRef.componentInstance.message = modalAlert.message;
    modalRef.componentInstance.buttonLabel = modalAlert.buttonLabel;

    return modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      return new DeleteModal({id: modalAlert.id});
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
      return new DeleteModal({id: modalAlert.id});
    });
  }

  modalConfirmer(modalConfirmer: ModalConfirmer): Promise<Action> {
    const modalRef = this.modalService.open(ModalConfirmerComponent);
    modalRef.componentInstance.title = modalConfirmer.title;
    modalRef.componentInstance.message = modalConfirmer.message;
    modalRef.componentInstance.yesButtonLabel = modalConfirmer.yesButtonLabel;
    modalRef.componentInstance.noButtonLabel = modalConfirmer.noButtonLabel;

    return modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      const newModal = {
        modal: {
          id: modalConfirmer.id,
          changes: {
            ...modalConfirmer,
            result: result,
          },
        },
      };
      return new UpdateModal(newModal);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
      const newModal = {
        modal: {
          id: modalConfirmer.id,
          changes: {
            ...modalConfirmer,
            result: undefined,
          },
        },
      };
      return new UpdateModal(newModal);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}