import { NgModule } from "@angular/core";

import { SharedModule } from "../../shared/shared.module";

import { ComponentsModule } from "../components/components.module";

import { CheckBoxContainerComponent } from "./blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "./blocks/dropdown/dropdown.container";
import { ListContainerComponent } from "./list/list.container";
import { TextInputContainerComponent } from "./blocks/text-input/text-input.container";

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
  ],
  declarations: [
    CheckBoxContainerComponent,
    DropdownContainerComponent,
    ListContainerComponent,
    TextInputContainerComponent,
  ],
  exports: [
    CheckBoxContainerComponent,
    DropdownContainerComponent,
    ListContainerComponent,
    TextInputContainerComponent,
  ],
})
export class ContainersModule {
}

export {
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  ListContainerComponent,
  TextInputContainerComponent,
};
