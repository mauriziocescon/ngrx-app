import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Instance } from '../../../models';

@Component({
  selector: 'app-instance-cp',
  templateUrl: './instance.component.html',
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
