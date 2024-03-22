import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationBarContainerComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarContainerComponent,
  ],
  template: `
    <app-navigation-bar-ct></app-navigation-bar-ct>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
}
