const faker = require('faker');

exports.getDatePicker = (id) => {
  const value = faker.date.future().toISOString();
  const required = faker.random.boolean();

  let datePicker = {
    id: id,
    type: 'date-picker',
    order: parseInt(id),
    label: 'COMPONENT.DATE_PICKER.DATE_PICKER_LABEL',
    value: value,
    required: required,
    disabled: false,
    valid: required ? !!value : true,
    hooks: {
      datePickerBlockDidLoad: 'datePickerBlockDidLoad',
      datePickerBlockDidChange: 'datePickerBlockDidChange',
    },
  };

  return datePicker;
};
