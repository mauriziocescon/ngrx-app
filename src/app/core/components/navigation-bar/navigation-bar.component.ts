import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AppConstantsService } from '../../services/app-constants.service';

@Component({
  selector: 'app-navigation-bar-cp',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  @Input() languages: string[];
  @Input() selectedLanguageId: string;
  @Output() languageDidChange: EventEmitter<string>;
  @Output() navigationDidChange: EventEmitter<{ path: string }>;

  isCollapsed: boolean;

  constructor(protected appConstants: AppConstantsService) {
    this.languageDidChange = new EventEmitter<string>();
    this.navigationDidChange = new EventEmitter<{ path: string }>();
    this.isCollapsed = true;
  }

  get canOpenJsonServer(): boolean {
    return this.appConstants.Application.SHOW_JSON_SERVER_API === true;
  }

  selectLanguage(language: string): void {
    this.languageDidChange.emit(language);
  }

  goToInstanceList(): void {
    this.navigationDidChange.emit({ path: '/instance-list' });
  }

  openJsonServer(): void {
    window.open(this.appConstants.Application.JSON_SERVER_API_URL);
  }
}
