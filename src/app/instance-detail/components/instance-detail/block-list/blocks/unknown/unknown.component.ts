import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-unknown-cp',
  template: `
    <div class="container-fluid unknown-component">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <span>{{ "COMPONENT.UNKNOWN.HEADER" | translate }}</span>
            </div>
            <div class="card-body">
              <p class="card-text">{{ "COMPONENT.UNKNOWN.ALERT_MSG" | translate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`
    .unknown-component {
      padding-top: 10px;
    }
  `],
})
export class UnknownComponent {
  @Input() blockId: string;
}
