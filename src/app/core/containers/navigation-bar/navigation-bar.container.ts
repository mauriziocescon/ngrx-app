import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromCoreReducers from '../../store/reducers';

import * as fromCoreSelectors from '../../store/selectors';

import { AppLanguageService } from '../../services/app-language.service';

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

  constructor(protected store$: Store<fromCoreReducers.CoreState>,
              protected router: Router,
              protected appLanguage: AppLanguageService) {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.setupAsyncObs();
  }

  selectLanguage(language: string): void {
    this.appLanguage.setLanguageId(language);
  }

  goTo(route: { path: string }): void {
    this.router.navigate([route.path]);
  }

  protected setupAsyncObs(): void {
    this.language$ = this.store$.pipe(select(fromCoreSelectors.getLanguageState));
  }
}
