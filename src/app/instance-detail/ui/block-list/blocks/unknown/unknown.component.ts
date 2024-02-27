import { Component, Input } from '@angular/core';

import { TranslocoPipe } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-unknown-cp',
  standalone: true,
  imports: [
    TranslocoPipe,
    MatCardModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div class="card-title">{{ "COMPONENT.UNKNOWN.HEADER" | transloco }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        {{ "COMPONENT.UNKNOWN.ALERT_MSG" | transloco }}
      </mat-card-content>
    </mat-card>`,
})
export class UnknownComponent {
  @Input() blockId: string;
}
