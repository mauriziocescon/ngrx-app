import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

import { AddComponentDirective } from "./directives/add-container.directive";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";

import { Enum } from "./utilities/enum";
import { KeyValue } from "./utilities/keyvalue";
import { CustomRouterStateSerializer } from "./utilities/route-util";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    TranslateModule,
  ],
  declarations: [
    AddComponentDirective,
    NavigationBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    TranslateModule,
    AddComponentDirective,
    NavigationBarComponent,
  ],
})
export class SharedModule {
}

export {
  AddComponentDirective,
  NavigationBarComponent,
  Enum,
  KeyValue,
  CustomRouterStateSerializer,
};
