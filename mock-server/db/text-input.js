const faker = require('faker');

exports.getTextInput = (index) => {
  const value = faker.datatype.boolean() ? faker.lorem.words(faker.datatype.number(5)) : undefined;
  const required = faker.datatype.boolean();
  const minLength = required && faker.datatype.boolean() ? faker.datatype.number(5) : undefined;
  const maxLength = required && faker.datatype.boolean() ? faker.datatype.number({min: 5, max: 10}) : undefined;

  let textInput = {
    id: faker.datatype.uuid(),
    type: 'text-input',
    order: parseInt(index),
    label: 'COMPONENT.TEXT_INPUT.TEXT_INPUT_LABEL',
    value: value,
    required: required,
    minLength: minLength,
    maxLength: maxLength,
    disabled: false,
    valid: true,
  };

  if (required && (!value || !value.length)) {
    textInput.valid = false;
    return textInput;
  }

  if (minLength >= 0 && value !== undefined && value.length < minLength) {
    textInput.valid = false;
    return textInput;
  }

  if (maxLength >= 0 && value !== undefined && value.length > maxLength) {
    textInput.valid = false;
    return textInput;
  }

  return textInput;
};
