import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppLanguageService } from '../services/app-language.service';

import { feature } from '../store/core.feature';

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

  protected router = inject(Router);
  protected store$ = inject(Store);
  protected appLanguage = inject(AppLanguageService);

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

  protected setupAsyncObs(): void {
    this.language$ = this.store$.pipe(select(feature.selectSelectedLanguage));
  }
}
