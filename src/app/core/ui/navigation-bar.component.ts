import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppConstantsService } from '../services/app-constants.service';

@Component({
  selector: 'app-navigation-bar-cp',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>{{ "COMPONENT.NAVIGATION_BAR.NAME" | translate }}</span>
      <button mat-button aria-label="go to instances" (click)="goToInstanceList()">
        {{ "COMPONENT.NAVIGATION_BAR.INSTANCES" | translate }}
      </button>

      <span class="spacer"></span>

      @if (canOpenJsonServer) {
        <button mat-icon-button aria-label="open json server" (click)="openJsonServer()">
          <mat-icon>dns</mat-icon>
        </button>
      }

      <button mat-button [matMenuTriggerFor]="menu" aria-label="selected language">
        {{ selectedLanguageId }}
      </button>
      <mat-menu #menu="matMenu">
        @for (language of languages; track language) {
          <button mat-menu-item (click)="selectLanguage(language)">
            <span>{{ language }}</span>
          </button>
        }
      </mat-menu>

    </mat-toolbar>`,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }
  `,
})
export class NavigationBarComponent {
  @Input() languages: string[];
  @Input() selectedLanguageId: string;
  @Output() languageDidChange: EventEmitter<string>;
  @Output() navigationDidChange: EventEmitter<{ path: string }>;

  isCollapsed: boolean;

  protected appConstants = inject(AppConstantsService);

  constructor() {
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
