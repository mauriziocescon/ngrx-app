import { Injectable } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class UIUtilitiesService {
  protected modalService: NgbModal;

  constructor(modalService: NgbModal) {
    this.modalService = modalService;
  }

  modalAlert(title: string, message: string, buttonLabel: string): void {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = "World";

  }

  modalConfirmer(title: string, message: string, yesButtonLabel: string, noButtonLabel: string, callback: (result: boolean) => void): void {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = "World";

  }
}
