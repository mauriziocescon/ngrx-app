const faker = require('faker');

exports.getDropdown = (id) => {
  const value = faker.random.boolean() ? '1' : undefined;
  const required = faker.random.boolean();

  let dropdown = {
    id: id,
    type: 'dropdown',
    order: parseInt(id),
    label: 'COMPONENT.DROPDOWN.DROPDOWN_LABEL',
    value: value,
    choices: ['1', '2', '3'],
    required: required,
    disabled: false,
    valid: required ? !!value : true,
    hooks: {
      dropdownBlockDidLoad: 'dropdownBlockDidLoad',
      dropdownBlockDidChange: 'dropdownBlockDidChange',
    },
  };

  return dropdown;
};
