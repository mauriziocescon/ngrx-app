import { Component, inject, Input } from '@angular/core';

import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [
    NgbModalModule,
  ],
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
      <button type="button" class="btn btn-primary" (click)="close()">{{ buttonLabel }}</button>
    </div>`,
})
export class ModalAlertComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() buttonLabel: string;

  protected activeModal = inject(NgbActiveModal);

  close(): void {
    this.activeModal.close('Close click');
  }

  dismiss(): void {
    this.activeModal.dismiss('Close click');
  }
}
