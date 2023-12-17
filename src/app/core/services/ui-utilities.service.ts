import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';

import { ModalAlertComponent } from '../ui/modal-alert.component';
import { ModalConfirmerComponent } from '../ui/modal-confirmer.component';

import { ModalAlert, ModalConfirmer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UIUtilitiesService {
  private dialog = inject(MatDialog);
  private logger = inject(NGXLogger);

  modalAlert(modalAlert: ModalAlert): Observable<void> {
    const dialogRef = this.dialog.open(ModalAlertComponent, {
      data: {
        title: modalAlert.title,
        message: modalAlert.message,
        buttonLabel: modalAlert.buttonLabel,
      },
    });
    return dialogRef.afterClosed();
  }

  modalConfirmer(modalConfirmer: ModalConfirmer): Observable<boolean | undefined> {
    const dialogRef = this.dialog.open(ModalConfirmerComponent, {
      data: {
        title: modalConfirmer.title,
        message: modalConfirmer.message,
        yesButtonLabel: modalConfirmer.yesButtonLabel,
        noButtonLabel: modalConfirmer.noButtonLabel,
      },
    });
    return dialogRef.afterClosed();
  }
}
