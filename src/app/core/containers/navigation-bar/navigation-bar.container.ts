import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as fromCore from "../../reducers";

import { AppLanguageService } from "../../services/app-language.service";

@Component({
  selector: "ct-navigation-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cp-navigation-bar
      [languages]="languages"
      [selectedLanguageId]="language$ | async"
      (languageDidChange)="selectLanguage($event)"
      (navigationDidChange)="goTo($event)">
    </cp-navigation-bar>`,
})
export class NavigationBarContainerComponent {
  languages: string[];
  language$: Observable<string>;

  constructor(protected store: Store<fromCore.CoreState>,
              protected router: Router,
              protected appLanguage: AppLanguageService) {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.language$ = this.store.select(fromCore.getLanguageState);
  }

  selectLanguage(language: string): void {
    this.appLanguage.setLanguageId(language);
  }

  goTo(route: { path: string, module: string, instance: string, step: string }): void {
    this.router.navigate(["/dyn-forms", {module: route.module, instance: route.instance, step: route.step}]);
  }
}
