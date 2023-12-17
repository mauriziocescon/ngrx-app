import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <app-navigation-bar-ct></app-navigation-bar-ct>
      <router-outlet></router-outlet>`,
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
