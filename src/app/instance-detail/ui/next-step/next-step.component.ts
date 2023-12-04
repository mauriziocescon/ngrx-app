import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-next-step-cp',
  standalone: true,
  imports: [
    TranslateModule,
  ],
  template: `
    <div class="container-fluid next-step-component sticky-top">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <h5 class="card-header">
              <span>{{ "COMPONENT.NEXT_STEP.HEADER" | translate }}</span>
            </h5>
            <div class="card-body">
              <div class="button-row">
                <button class="btn btn-primary action-button" (click)="moveToNextStep()"
                        [disabled]="!nextStepBtnEnabled">{{ "COMPONENT.NEXT_STEP.NEXT_STEP" | translate }}</button>
              </div>
              <div class="button-row">
                <button class="btn btn-default action-button"
                        (click)="resetForm()">{{ "COMPONENT.NEXT_STEP.CANCEL" | translate }}</button>
              </div>
              <div class="button-row" [hidden]="!isSynchronized">
                <span class="fas fa-check"></span>&nbsp;
                <span>{{ "COMPONENT.NEXT_STEP.SYNC" | translate }}</span>
              </div>
              <div class="button-row" [hidden]="!isSynchronizing">
                <span class="fas fa-sync fa-spin"></span>&nbsp;
                <span>{{ "COMPONENT.NEXT_STEP.SYNCING" | translate }}</span>
              </div>
              <div class="button-row" [hidden]="!canRetrySync" (click)="retrySyncronization()">
                <span class="fas fa-redo"></span>&nbsp;
                <span>{{ "COMPONENT.NEXT_STEP.RETRY" | translate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`
    .next-step-component {
      top: calc(var(--navbar-padding-y) * 4.5);
      padding-top: 20px;

      .button-row {
        padding-top: 5px;

        .action-button {
          min-width: 90px;
        }
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
