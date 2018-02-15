import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "cp-next-step",
  templateUrl: "./next-step.component.html",
  styleUrls: ["./next-step.component.scss"],
})
export class NextStepComponent {
  @Input() formValidity: boolean;
  @Input() syncing: boolean;
  @Input() syncError: string;
  @Output() nextStep: EventEmitter<void>;
  @Output() reset: EventEmitter<void>;

  constructor() {
    this.nextStep = new EventEmitter();
    this.reset = new EventEmitter();
  }

  moveToNextStep(): void {
    this.nextStep.emit();
  }

  resetForm(): void {
    this.reset.emit();
  }
}
