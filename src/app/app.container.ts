import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-component">
      <app-navigation-bar-ct></app-navigation-bar-ct>
      <div class="main-view">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-component {
      .main-view {
        padding-top: 4.25rem;
      }
    }
  `],
})
export class AppContainerComponent {

  constructor(protected swUpdate: SwUpdate) {
    this.swUpdate
      .available
      .subscribe(evt => {
        location.reload();
      });
  }
}
