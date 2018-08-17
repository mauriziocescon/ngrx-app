const faker = require('faker');

exports.getCheckBox = (index) => {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBox = {
    id: faker.random.uuid(),
    type: 'check-box',
    order: parseInt(index),
    label: 'COMPONENT.CHECK_BOX.CHECK_BOX_LABEL',
    value: value,
    description: 'COMPONENT.CHECK_BOX.CHECK_BOX_DESC',
    required: required,
    disabled: false,
    valid: required ? !!value : true,
  };

  return checkBox;
};
