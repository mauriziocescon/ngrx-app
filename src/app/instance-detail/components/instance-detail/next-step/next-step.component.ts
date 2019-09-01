import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cp-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss'],
})
export class NextStepComponent {
  @Input() nextStepBtnEnabled: boolean;
  @Input() syncing: boolean;
  @Input() syncError: boolean;
  @Output() nextStep: EventEmitter<void>;
  @Output() reset: EventEmitter<void>;
  @Output() retrySync: EventEmitter<void>;

  constructor() {
    this.nextStep = new EventEmitter();
    this.reset = new EventEmitter();
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
    this.reset.emit();
  }

  retrySyncronization(): void {
    this.retrySync.emit();
  }
}
