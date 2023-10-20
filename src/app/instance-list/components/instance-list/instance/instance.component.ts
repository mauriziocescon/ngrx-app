import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Instance } from '../../../models';

@Component({
  selector: 'app-instance-cp',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <h6 class="card-subtitle text-right">
          <span class="mr-1">{{ blocksCounter }}</span>
          <span appValidityState [valid]="validityState"></span>
        </h6>
        <p class="card-text">{{ bodyText }}</p>
        <button class="btn btn-primary" (click)="selectInstance()">{{ "COMPONENT.INSTANCE.SHOW" | translate }}</button>
      </div>
    </div>`,
})
export class InstanceComponent {
  @Input() instance: Instance;
  @Output() instanceSelected: EventEmitter<void>;

  constructor() {
    this.instanceSelected = new EventEmitter<void>();
  }

  get title(): string {
    return this.instance.id;
  }

  get bodyText(): string {
    return this.instance.description;
  }

  get validityState(): boolean {
    return this.instance.blocks.every(i => i.valid === true);
  }

  get blocksCounter(): string {
    const validBlocks = this.instance.blocks.filter(b => b.valid === true).length;
    return `(${validBlocks} / ${this.instance.blocks.length})`;
  }

  selectInstance(): void {
    this.instanceSelected.emit();
  }
}
