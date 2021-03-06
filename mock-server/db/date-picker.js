const faker = require('faker');

exports.getDatePicker = (index) => {
  const value = faker.date.future().toISOString();
  const required = faker.datatype.boolean();

  let datePicker = {
    id: faker.datatype.uuid(),
    type: 'date-picker',
    order: parseInt(index),
    label: 'COMPONENT.DATE_PICKER.DATE_PICKER_LABEL',
    value: value,
    required: required,
    disabled: false,
    valid: required ? !!value : true,
  };

  return datePicker;
};
