import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TranslateModule } from "@ngx-translate/core";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { Enum } from "./utilities/enum";
import { KeyValue } from "./utilities/keyvalue";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule,
  ],
  declarations: [
    NavigationBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule,
    NavigationBarComponent,
  ],
})
export class SharedModule {
}

export {
  NavigationBarComponent,
  Enum,
  KeyValue
};
