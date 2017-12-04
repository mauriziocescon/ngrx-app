import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { ListComponent } from "./list/list.component";
import { GenericBlockComponent } from "./generic-block/generic-block.component";

import { CheckBoxComponent } from "./blocks/check-box/check-box.component";
import { DropdownComponent } from "./blocks/dropdown/dropdown.component";
import { TextInputComponent } from "./blocks/text-input/text-input.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    GenericBlockComponent,
    ListComponent,
    CheckBoxComponent,
    DropdownComponent,
    TextInputComponent,
  ],
  exports: [
    GenericBlockComponent,
    ListComponent,
    CheckBoxComponent,
    DropdownComponent,
    TextInputComponent,
  ],
})
export class ComponentsModule {
}

export {
  GenericBlockComponent,
  ListComponent,
  CheckBoxComponent,
  DropdownComponent,
  TextInputComponent,
};
