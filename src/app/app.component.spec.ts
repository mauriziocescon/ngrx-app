import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';

import { TranslocoTestingModule } from '@ngneat/transloco';

import { NavigationBarContainerComponent } from './core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: { de: {}, en: {}, it: {} },
          translocoConfig: {
            availableLangs: ['de', 'en', 'it'],
            defaultLang: 'en',
          },
          preloadLangs: true,
        }),
        NavigationBarContainerComponent,
        AppComponent,
      ],
      providers: [
        provideStore(),
      ],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
