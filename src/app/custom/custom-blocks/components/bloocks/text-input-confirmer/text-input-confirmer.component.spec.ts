import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule } from "../../../../../core/core.module";
import { SharedModule } from "../../../../../shared/shared.module";

import { CustomBlockType } from "../../../models";
import { TextInputConfirmerComponent } from "./text-input-confirmer.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("TextInputConfirmerComponent", () => {
  let component: TextInputConfirmerComponent;
  let fixture: ComponentFixture<TextInputConfirmerComponent>;

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
        TextInputConfirmerComponent,
      ],
      providers: [
        TranslateService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputConfirmerComponent);
    component = fixture.componentInstance;
    component.block = {
      id: 1,
      type: CustomBlockType.TextInputConfirmer,
      label: "",
      value: "45",
      required: true,
      minLength: 0,
      maxLength: 5,
      disabled: false,
      valid: true,
    };
    component.loading = false;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
