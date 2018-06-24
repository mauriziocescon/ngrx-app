import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../../../../../../../core/core.module';
import { SharedModule } from '../../../../../../../shared/shared.module';

import { BlockType } from '../../../../../../models';
import { CheckBoxComponent } from './check-box.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('CheckBoxComponent', () => {
  let component: CheckBoxComponent;
  let fixture: ComponentFixture<CheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgbModule.forRoot(),
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
        CheckBoxComponent,
      ],
      providers: [
        TranslateService,
        NGXLogger,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxComponent);
    component = fixture.componentInstance;
    component.block = {
      id: '1',
      type: BlockType.CheckBox,
      order: 1,
      label: '',
      value: true,
      description: '',
      required: true,
      disabled: false,
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
