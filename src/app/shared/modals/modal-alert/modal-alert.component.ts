import { Component, Input } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-alert",
  templateUrl: "./modal-alert.component.html",
  styleUrls: ["./modal-alert.component.scss"],
})
export class ModalAlertComponent {
  protected activeModal: NgbActiveModal;

  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  buttonLabel: string;

  constructor(activeModal: NgbActiveModal) {
    this.activeModal = activeModal;
  }

  close(): void {
    this.activeModal.close("Close click");
  }

  dismiss(): void {
    this.activeModal.dismiss("Close click");
  }
}