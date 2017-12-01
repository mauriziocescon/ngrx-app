import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { CheckBoxComponent } from "./check-box/check-box.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { ListComponent } from "./list/list.component";
import { TextInputComponent } from "./text-input/text-input.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CheckBoxComponent,
    DropdownComponent,
    ListComponent,
    TextInputComponent,
  ],
  exports: [
    CheckBoxComponent,
    DropdownComponent,
    ListComponent,
    TextInputComponent,
  ],
})
export class ComponentsModule {
}

export {
  CheckBoxComponent,
  DropdownComponent,
  ListComponent,
  TextInputComponent,
};
