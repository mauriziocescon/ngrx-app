import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cp-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent {
  @Input() languages: string[];
  @Input() selectedLanguageId: string;
  @Output() languageDidChange: EventEmitter<string>;
  @Output() navigationDidChange: EventEmitter<{path: string}>;

  constructor() {
    this.languageDidChange = new EventEmitter<string>();
    this.navigationDidChange = new EventEmitter<{path: string}>();
  }

  selectLanguage(language: string): void {
    this.languageDidChange.emit(language);
  }

  goToInstanceList(): void {
    this.navigationDidChange.emit({path: "/instance-list"});
  }
}
