import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../../../../core/core.module';
import { SharedModule } from '../../../../shared/shared.module';

import { B4BlockType } from '../../../models';
import { DossierComponent } from './dossier.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('DossierComponent', () => {
  let component: DossierComponent;
  let fixture: ComponentFixture<DossierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient],
          },
        }),
        LoggerModule.forRoot({
          serverLoggingUrl: '',
          level: NgxLoggerLevel.OFF,
          serverLogLevel: NgxLoggerLevel.OFF,
        }),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        DossierComponent,
      ],
      providers: [
        TranslateService,
        NGXLogger,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierComponent);
    component = fixture.componentInstance;
    component.block = {
      id: '1',
      type: B4BlockType.Dossier,
      order: 1,
      section1: {
        sectionLabel: '',

        label1: '',
        value1: '',
        required1: true,
        disabled1: false,

        label2: '',
        value2: '',
        required2: true,
        disabled2: false,

        label3: '',
        value3: true,
        required3: true,
        disabled3: false,
      },
      section2: {
        sectionLabel: '',

        label1: '',
        value1: '',
        required1: true,
        disabled1: false,
      },
      valid: true,
      hooks: {},
    };
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
