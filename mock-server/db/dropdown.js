const faker = require('faker');

exports.getDropdown = (index) => {
  const value = faker.datatype.boolean() ? '1' : undefined;
  const required = faker.datatype.boolean();

  let dropdown = {
    id: faker.datatype.uuid(),
    type: 'dropdown',
    order: parseInt(index),
    label: 'COMPONENT.DROPDOWN.DROPDOWN_LABEL',
    value: value,
    choices: ['1', '2', '3'],
    required: required,
    disabled: false,
    valid: required ? !!value : true,
  };

  return dropdown;
};
