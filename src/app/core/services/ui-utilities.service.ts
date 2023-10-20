import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

import { ModalAlertComponent } from '../components/modal-alert.component';
import { ModalConfirmerComponent } from '../components/modal-confirmer.component';

import { ModalAlert, ModalConfirmer } from '../models';

import { coreActions } from '../store/core.actions';

@Injectable({
  providedIn: 'root',
})
export class UIUtilitiesService {

  constructor(protected modal: NgbModal,
              protected logger: NGXLogger) {
  }

  modalAlert(modalAlert: ModalAlert): Promise<Action> {
    const modalRef = this.modal.open(ModalAlertComponent);
    modalRef.componentInstance.title = modalAlert.title;
    modalRef.componentInstance.message = modalAlert.message;
    modalRef.componentInstance.buttonLabel = modalAlert.buttonLabel;

    return modalRef.result.then((result) => {
      this.logger.log(`Closed with: ${result}`);
      return coreActions.dismissModalAlert({ id: modalAlert.id });
    }, (reason) => {
      this.logger.log(`Dismissed ${this.getDismissReason(reason)}`);
      return coreActions.dismissModalAlert({ id: modalAlert.id });
    });
  }

  modalConfirmer(modalConfirmer: ModalConfirmer): Promise<Action> {
    const modalRef = this.modal.open(ModalConfirmerComponent);
    modalRef.componentInstance.title = modalConfirmer.title;
    modalRef.componentInstance.message = modalConfirmer.message;
    modalRef.componentInstance.yesButtonLabel = modalConfirmer.yesButtonLabel;
    modalRef.componentInstance.noButtonLabel = modalConfirmer.noButtonLabel;

    return modalRef.result.then((result) => {
      this.logger.log(`Closed with: ${result}`);
      if (result) {
        return coreActions.dismissModalConfirmerWithPositiveResult({ id: modalConfirmer.id });
      } else {
        return coreActions.dismissModalConfirmerWithNegativeResult({ id: modalConfirmer.id });
      }
    }, (reason) => {
      this.logger.log(`Dismissed ${this.getDismissReason(reason)}`);
      return coreActions.dismissModalConfirmer({ id: modalConfirmer.id });
    });
  }

  protected getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
