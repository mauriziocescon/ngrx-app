import { Component, inject, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert',
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
      <button mat-button color="primary" (click)="close()">{{ data.buttonLabel }}</button>
    </div>`,
})
export class ModalAlertComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() buttonLabel: string;

  protected dialogRef = inject(MatDialogRef<ModalAlertComponent>);
  protected data: { title: string, message: string, buttonLabel: string } = inject(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
