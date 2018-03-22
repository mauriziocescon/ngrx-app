import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() buttonLabel: string;

  constructor(protected activeModal: NgbActiveModal) {
  }

  close(): void {
    this.activeModal.close('Close click');
  }

  dismiss(): void {
    this.activeModal.dismiss('Close click');
  }
}
