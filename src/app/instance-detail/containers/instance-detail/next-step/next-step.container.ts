import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ct-next-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-next-step
      (nextStep)="nextStep()"
      (reset)="reset()">
    </cp-next-step>`,
})
export class NextStepContainerComponent {
  @Input() instance: string;

  constructor() {
  }

  nextStep(): void {
    // dispatch action to move forward
    alert(`NextStepContainerComponent: save`);
  }

  reset(): void {
    // dispatch action to reset the store
    alert(`NextStepContainerComponent: reset`);
  }
}
