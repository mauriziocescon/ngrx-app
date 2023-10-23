import { InstanceDetailContainerComponent } from './instance-detail/instance-detail.container';

import { BlockListContainerComponent } from './instance-detail/block-list/block-list.container';
import { CheckBoxContainerComponent } from './instance-detail/block-list/blocks/check-box/check-box.container';
import {
  CheckBoxConfirmerContainerComponent,
} from './instance-detail/block-list/blocks/check-box-confirmer/check-box-confirmer.container';
import { DatePickerContainerComponent } from './instance-detail/block-list/blocks/date-picker/date-picker.container';
import { DropdownContainerComponent } from './instance-detail/block-list/blocks/dropdown/dropdown.container';
import { TextInputContainerComponent } from './instance-detail/block-list/blocks/text-input/text-input.container';

import { NextStepContainerComponent } from './instance-detail/next-step/next-step.container';

export { InstanceDetailContainerComponent } from './instance-detail/instance-detail.container';

export const CONTAINERS = [
  InstanceDetailContainerComponent,

  BlockListContainerComponent,
  CheckBoxContainerComponent,
  CheckBoxConfirmerContainerComponent,
  DatePickerContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,

  NextStepContainerComponent,
];
