import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';

import { TranslateModule } from '@ngx-translate/core';

import { NavigationBarContainerComponent } from './core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
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
