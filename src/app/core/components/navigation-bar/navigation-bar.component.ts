import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AppConstantsService } from '../../services/app-constants.service';

@Component({
  selector: 'app-navigation-bar-cp',
  template: `
    <nav class="navbar navbar-expand-lg bg-primary navbar-light fixed-top navigation-bar-component">
      <a class="navbar-brand custom" href="#">{{ "COMPONENT.NAVIGATION_BAR.NAME" | translate }}</a>
      <button class="navbar-toggler" type="button" (click)="isCollapsed = !isCollapsed">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" (click)="goToInstanceList()">{{ "COMPONENT.NAVIGATION_BAR.INSTANCES" | translate }}</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" *ngIf="canOpenJsonServer">
            <a class="nav-link" (click)="openJsonServer()"><span class="fas fa-server"></span></a>
          </li>
          <li class="nav-item dropdown" ngbDropdown>
            <a class="nav-link dropdown-toggle" ngbDropdownToggle>{{ selectedLanguageId }}</a>
            <div class="dropdown-menu" ngbDropdownMenu>
              <a class="dropdown-item" *ngFor="let language of languages" (click)="selectLanguage(language)">
                {{ language }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>`,
  styles: [`
    .navigation-bar-component {
      .navbar-brand.custom {
        color: white;
      }
    }
  `],
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
