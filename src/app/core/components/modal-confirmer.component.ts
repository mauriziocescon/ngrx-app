import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmer',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="yes()">{{ yesButtonLabel }}</button>
      <button type="button" class="btn btn-default" (click)="no()">{{ noButtonLabel }}</button>
    </div>`,
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
    this.activeModal.dismiss('Close click');
  }
}
