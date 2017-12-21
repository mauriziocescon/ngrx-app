import { Component, Input } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "modal-confirmer",
  templateUrl: "./modal-confirmer.component.html",
  styleUrls: ["./modal-confirmer.component.scss"],
})
export class ModalConfirmerComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() yesButtonLabel: string;
  @Input() noButtonLabel: string;

  constructor(protected activeModal: NgbActiveModal) {
  }

  yes(): void {
    this.activeModal.close(true);
  }

  no(): void {
    this.activeModal.close(false);
  }

  dismiss(): void {
    this.activeModal.dismiss("Close click");
  }
}
