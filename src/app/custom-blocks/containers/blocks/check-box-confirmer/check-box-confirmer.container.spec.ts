import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoggerModule, NGXLogger, NgxLoggerLevel } from "ngx-logger";

import { StoreModule, Store, combineReducers } from "@ngrx/store";
import * as fromRoot from "../../../../reducers";
import * as fromCustomBlocks from "../../../reducers";

import { CoreModule } from "../../../../core/core.module";
import { SharedModule } from "../../../../shared/shared.module";

import { CustomBlockType } from "../../../models";
import { COMPONENTS } from "../../../components";
import { CONTAINERS, CheckBoxConfirmerContainerComponent } from "../../../containers";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("CheckBoxConfirmerComponent", () => {
  let component: CheckBoxConfirmerContainerComponent;
  let fixture: ComponentFixture<CheckBoxConfirmerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        LoggerModule.forRoot({
          serverLoggingUrl: "",
          level: NgxLoggerLevel.OFF,
          serverLogLevel: NgxLoggerLevel.OFF,
        }),
        StoreModule.forRoot(fromRoot.TOKEN),
        StoreModule.forFeature("customBlocks", fromCustomBlocks.TOKEN),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        ...COMPONENTS,
        ...CONTAINERS,
      ],
      providers: [
        TranslateService,
        NGXLogger,
        fromRoot.reducerProvider,
        fromCustomBlocks.reducerProvider,
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        // the usage of overrideModule comes from {@Link https://github.com/angular/angular/issues/10760}
        set: {
          entryComponents: [
            ...CONTAINERS,
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxConfirmerContainerComponent);
    component = fixture.componentInstance;
    component.blockId = 1;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});