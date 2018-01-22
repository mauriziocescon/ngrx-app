import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule } from "../../../../../core/core.module";
import { SharedModule } from "../../../../../shared/shared.module";

import { GenericBlockContainerComponent } from "../../../containers";
import { UnknownComponent } from "./unknown.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("UnknownComponent", () => {
  let component: UnknownComponent;
  let fixture: ComponentFixture<UnknownComponent>;

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
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        UnknownComponent,
        GenericBlockContainerComponent,
      ],
      providers: [
        TranslateService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
