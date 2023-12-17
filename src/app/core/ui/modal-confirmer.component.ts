import { Component, inject, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
      <h1 mat-dialog-title>{{ data.title }}</h1>
      <div mat-dialog-content>
          {{ data.message }}
      </div>
      <div mat-dialog-actions>
          <button mat-button color="primary" (click)="yes()">{{ data.yesButtonLabel }}</button>
          <button mat-button (click)="no()">{{ data.noButtonLabel }}</button>
      </div>`,
})
export class ModalConfirmerComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() yesButtonLabel: string;
  @Input() noButtonLabel: string;

  protected dialogRef = inject(MatDialogRef<ModalConfirmerComponent>);
  protected data: {
    title: string,
    message: string,
    yesButtonLabel: string,
    noButtonLabel: string
  } = inject(MAT_DIALOG_DATA);

  yes(): void {
    this.dialogRef.close(true);
  }

  no(): void {
    this.dialogRef.close(false);
  }
}
