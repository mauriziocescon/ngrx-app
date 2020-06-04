const faker = require('faker');

exports.getDropdown = (index) => {
  const value = faker.random.boolean() ? '1' : undefined;
  const required = faker.random.boolean();

  let dropdown = {
    id: faker.random.uuid(),
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
