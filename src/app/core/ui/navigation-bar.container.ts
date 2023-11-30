import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AppLanguageService } from '../services/app-language.service';

import { feature } from '../store/core.feature';

@Component({
  selector: 'app-navigation-bar-ct',
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

  constructor(protected router: Router,
              protected store$: Store,
              protected appLanguage: AppLanguageService) {
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
