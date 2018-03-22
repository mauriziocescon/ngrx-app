import { BlockActions } from '../../../instance-detail/instance-detail.module';

import { DatePickerActions } from './date-picker-actions';

export interface B2BlockActions extends BlockActions {
  datePicker: DatePickerActions;
}
