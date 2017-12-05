import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { CheckBoxComponent } from "./blocks/check-box/check-box.component";
import { DropdownComponent } from "./blocks/dropdown/dropdown.component";
import { TextInputComponent } from "./blocks/text-input/text-input.component";

import { ListComponent } from "./list/list.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CheckBoxComponent,
    DropdownComponent,
    TextInputComponent,
    ListComponent,
  ],
  exports: [
    CheckBoxComponent,
    DropdownComponent,
    TextInputComponent,
    ListComponent,
  ],
})
export class ComponentsModule {
}

export {
  CheckBoxComponent,
  DropdownComponent,
  TextInputComponent,
  ListComponent,
};
