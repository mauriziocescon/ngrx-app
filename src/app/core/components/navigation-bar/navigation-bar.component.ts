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
  @Output() navigationDidChange: EventEmitter<{ path: string, module: string, instance: string, step: string }>;

  constructor() {
    this.languageDidChange = new EventEmitter<string>();
    this.navigationDidChange = new EventEmitter<{ path: string, module: string, instance: string, step: string }>();
  }

  selectLanguage(language: string): void {
    this.languageDidChange.emit(language);
  }

  goToB1S1(): void {
    this.navigationDidChange.emit({path: "/dyn-forms", module: "b1", instance: "1", step: "1"});
  }

  goToB1S2(): void {
    this.navigationDidChange.emit({path: "/dyn-forms", module: "b1", instance: "1", step: "2"});
  }

  goToB2S1(): void {
    this.navigationDidChange.emit({path: "/dyn-forms", module: "b2", instance: "1", step: "1"});
  }

  goToB2S2(): void {
    this.navigationDidChange.emit({path: "/dyn-forms", module: "b2", instance: "1", step: "2"});
  }
}
