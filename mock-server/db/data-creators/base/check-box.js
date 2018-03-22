const faker = require('faker');

exports.getCheckBox = (id) => {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBox = {
    id: id,
    type: 'check-box',
    order: parseInt(id),
    label: 'COMPONENT.CHECK_BOX.CHECK_BOX_LABEL',
    value: value,
    description: 'COMPONENT.CHECK_BOX.CHECK_BOX_DESC',
    required: required,
    disabled: false,
    valid: required ? !!value : true,
    hooks: {
      checkBoxBlockDidLoad: 'checkBoxBlockDidLoad',
      checkBoxBlockDidChange: 'checkBoxBlockDidChange',
    },
  };

  return checkBox;
};
