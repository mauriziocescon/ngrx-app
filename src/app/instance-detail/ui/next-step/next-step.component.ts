import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ValidityStateDirective } from '../../../shared';

@Component({
  selector: 'app-next-step-cp',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ValidityStateDirective,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ "COMPONENT.NEXT_STEP.HEADER" | translate }}</mat-card-title>
      </mat-card-header>
      <mat-card-actions>
        <div class="action-btns">
          <button mat-raised-button color="primary" (click)="moveToNextStep()" [disabled]="!nextStepBtnEnabled">
            {{ "COMPONENT.NEXT_STEP.NEXT_STEP" | translate }}
          </button>
          <button mat-raised-button (click)="resetForm()" [disabled]="!nextStepBtnEnabled">
            {{ "COMPONENT.NEXT_STEP.CANCEL" | translate }}
          </button>
          <div [hidden]="!isSynchronized">
            <mat-icon>done</mat-icon>
            <span>{{ "COMPONENT.NEXT_STEP.SYNC" | translate }}</span>
          </div>
          <div [hidden]="!isSynchronizing">
            <mat-icon>sync</mat-icon>
            <span>{{ "COMPONENT.NEXT_STEP.SYNCING" | translate }}</span>
          </div>
          <div [hidden]="!canRetrySync" (click)="retrySyncronization()">
            <mat-icon>redo</mat-icon>
            <span>{{ "COMPONENT.NEXT_STEP.RETRY" | translate }}</span>
          </div>
        </div>
      </mat-card-actions>
    </mat-card>`,
  styles: [`
    .action-btns {
      display: flex;
      flex-direction: column;

      button {
        margin: var(--padding-s);
      }
    }
  `],
})
export class NextStepComponent {
  @Input() nextStepBtnEnabled: boolean;
  @Input() syncing: boolean;
  @Input() syncError: string;
  @Output() nextStep: EventEmitter<void>;
  @Output() resetSelections: EventEmitter<void>;
  @Output() retrySync: EventEmitter<void>;

  constructor() {
    this.nextStep = new EventEmitter();
    this.resetSelections = new EventEmitter();
    this.retrySync = new EventEmitter();
  }

  get isSynchronized(): boolean {
    return !this.isSynchronizing && this.syncError === undefined;
  }

  get isSynchronizing(): boolean {
    return this.syncing;
  }

  get canRetrySync(): boolean {
    return !this.isSynchronizing && this.syncError !== undefined;
  }

  moveToNextStep(): void {
    this.nextStep.emit();
  }

  resetForm(): void {
    this.resetSelections.emit();
  }

  retrySyncronization(): void {
    this.retrySync.emit();
  }
}
