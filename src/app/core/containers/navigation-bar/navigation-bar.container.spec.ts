import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

import { APP_BASE_HREF } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { StoreModule, Store, combineReducers } from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as fromCore from "../../reducers";

import { SharedModule } from "../../../shared/shared.module";

import { AppConstantsService } from "../../services/app-constants.service";
import { AppLanguageService } from "../../services/app-language.service";
import { LocalStorageService } from "../../services/local-storage.service";

import { COMPONENTS } from "../../components";
import { CONTAINERS, NavigationBarContainerComponent } from "../../containers";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("NavigationBarContainerComponent", () => {
  let component: NavigationBarContainerComponent;
  let fixture: ComponentFixture<NavigationBarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
        SharedModule,
      ],
      declarations: [
        ...COMPONENTS,
        ...CONTAINERS,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: "/"},
        TranslateService,
        AppConstantsService,
        AppLanguageService,
        LocalStorageService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
