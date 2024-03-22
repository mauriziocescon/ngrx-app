const faker = require('faker');

exports.getDatePicker = (index) => {
  const value = faker.date.future().toISOString();
  const required = faker.datatype.boolean();

  return {
    id: faker.datatype.uuid(),
    type: 'date-picker',
    order: parseInt(index),
    label: 'COMPONENT.DATE_PICKER.DATE_PICKER_LABEL',
    value: value,
    description: 'COMPONENT.DATE_PICKER.DATE_PICKER_DESC',
    required: required,
    disabled: false,
    valid: required ? !!value : true,
  };
};
