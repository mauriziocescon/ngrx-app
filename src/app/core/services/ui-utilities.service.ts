import { Injectable } from "@angular/core";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { ModalAlertComponent } from "../../shared/shared.module";
import { ModalConfirmerComponent } from "../../shared/shared.module";

@Injectable()
export class UIUtilitiesService {
  protected modalService: NgbModal;

  constructor(modalService: NgbModal) {
    this.modalService = modalService;
  }

  modalAlert(title: string, message: string, buttonLabel: string): void {
    const modalRef = this.modalService.open(ModalAlertComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.buttonLabel = buttonLabel;

    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modalConfirmer(title: string, message: string, yesButtonLabel: string, noButtonLabel: string, callback: (result: boolean) => void): void {
    const modalRef = this.modalService.open(ModalConfirmerComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.yesButtonLabel = yesButtonLabel;
    modalRef.componentInstance.noButtonLabel = noButtonLabel;

    modalRef.result.then((result) => {
      console.log(`Closed with: ${result}`);
      callback(result);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
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
