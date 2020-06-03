import { Component, ChangeDetectionStrategy } from '@angular/core';

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
  styleUrls: ['./app.container.scss'],
})
export class AppContainerComponent {
}
