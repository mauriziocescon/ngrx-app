import { Component, Input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-unknown-cp',
  standalone: true,
  imports: [
    TranslateModule,
    MatCardModule,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <div class="card-title">{{ "COMPONENT.UNKNOWN.HEADER" | translate }}</div>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        {{ "COMPONENT.UNKNOWN.ALERT_MSG" | translate }}
      </mat-card-content>
    </mat-card>`,
})
export class UnknownComponent {
  @Input() blockId: string;
}
