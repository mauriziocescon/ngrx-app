import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AppLanguageService } from '../../core';

import { NavigationBarComponent } from './navigation-bar.component';

@Component({
  selector: 'app-navigation-bar-ct',
  standalone: true,
  imports: [
    AsyncPipe,
    NavigationBarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navigation-bar-cp
      [languages]="languages"
      [selectedLanguageId]="(language$ | async)!"
      (languageDidChange)="selectLanguage($event)"
      (navigationDidChange)="goTo($event)">
    </app-navigation-bar-cp>`,
})
export class NavigationBarContainerComponent {
  languages: string[];
  language$: Observable<string>;

  private router = inject(Router);
  private appLanguage = inject(AppLanguageService);

  constructor() {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.setupAsyncObs();
  }

  selectLanguage(language: string): void {
    this.appLanguage.setLanguageId(language);
  }

  goTo(route: { path: string }): void {
    this.router.navigateByUrl(route.path);
  }

  private setupAsyncObs(): void {
    this.language$ = of(this.appLanguage.getLanguageId());
  }
}
