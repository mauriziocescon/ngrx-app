import { Component, Output, Input, EventEmitter } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../../../shared';

import { Instance } from '../../models';

@Component({
  selector: 'app-instance-cp',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
  ],
  template: `
      <mat-card>
          <mat-card-header>
              <mat-card-title>{{ title }}</mat-card-title>
              <mat-card-subtitle>
                  <span>{{ blocksCounter }}</span>
                  <span class="validity-state" appValidityState [valid]="validityState"></span>
              </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>{{ bodyText }}</mat-card-content>
          <mat-card-actions align="end">
              <button mat-button color="primary" (click)="selectInstance()">
                  {{ "COMPONENT.INSTANCE.SHOW" | translate }}
              </button>
          </mat-card-actions>
      </mat-card>`,
  styles: [`
    .validity-state {
      padding-left: 15px;
    }
  `],
})
export class InstanceComponent {
  @Input() instance: Instance;
  @Output() instanceSelected = new EventEmitter<void>();

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
