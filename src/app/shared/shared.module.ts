import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

import { AddContainerDirective } from "./directives/add-container.directive";

import { UIUtilitiesService } from "./modals/ui-utilities.service";
import { ModalAlertComponent } from "./modals/modal-alert/modal-alert.component";
import { ModalConfirmerComponent } from "./modals/modal-confirmer/modal-confirmer.component";

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
    AddContainerDirective,
    ModalAlertComponent,
    ModalConfirmerComponent,
    NavigationBarComponent,
  ],
  providers: [
    UIUtilitiesService,
  ],
  entryComponents: [
    ModalAlertComponent,
    ModalConfirmerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    TranslateModule,
    AddContainerDirective,
    NavigationBarComponent,
  ],
})
export class SharedModule {
}

export {
  UIUtilitiesService,
  AddContainerDirective,
  NavigationBarComponent,
  Enum,
  KeyValue,
  CustomRouterStateSerializer,
};
