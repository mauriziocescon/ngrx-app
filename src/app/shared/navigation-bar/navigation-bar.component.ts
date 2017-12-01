import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AppLanguageService } from "../../core/core.module";

@Component({
  selector: "navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit {

  public languages: string[];
  public selectedLanguageId: string;

  protected router: Router;
  protected appLanguage: AppLanguageService;

  constructor(router: Router,
              appLanguageService: AppLanguageService) {
    this.router = router;
    this.appLanguage = appLanguageService;
  }

  public ngOnInit(): void {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.selectedLanguageId = this.appLanguage.getLanguageId();
  }

  public selectLanguage(language: string): void {
    if (this.appLanguage.getLanguageId() !== language) {
      this.selectedLanguageId = language;
      this.appLanguage.setLanguageId(this.selectedLanguageId);
    }
  }

  public goToDynamicForm(): void {
    this.router.navigate(["/dyn-forms"]);
  }
}
