const faker = require("faker");

const getCheckBox = function(index) {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBox = {
    id: index,
    type: "check-box",
    label: "COMPONENT.CHECK_BOX.CHECK_BOX_LABEL",
    value: value,
    description: "COMPONENT.CHECK_BOX.CHECK_BOX_DESC",
    disabled: false,
    required: required,
    valid: required ? !!value : true,
    hooks: {
      checkBoxBlockDidLoad: "checkBoxBlockDidLoad",
      checkBoxBlockDidChange: "checkBoxBlockDidChange",
    },
  };

  return checkBox;
};

const getDropdown = function(index) {
  const value = faker.random.boolean() ? "1" : undefined;
  const required = faker.random.boolean();

  let dropdown = {
    id: index,
    type: "dropdown",
    label: "COMPONENT.DROPDOWN.DROPDOWN_LABEL",
    value: value,
    choices: ["1", "2", "3"],
    disabled: false,
    required: required,
    valid: required ? !!value : true,
    hooks: {
      dropdownBlockDidLoad: "dropdownBlockDidLoad",
      dropdownBlockDidChange: "dropdownBlockDidChange",
    },
  };

  return dropdown;
};

const getTextInput = function(index) {
  const value = faker.random.boolean() ? faker.lorem.words(faker.random.number(5)) : undefined;
  const required = faker.random.boolean();
  const minLength = required && faker.random.boolean() ? faker.random.number(5) : undefined;
  const maxLength = required && faker.random.boolean() ? faker.random.number({min: 5, max: 10}) : undefined;

  let textInput = {
    id: index,
    type: "text-input",
    label: "COMPONENT.TEXT_INPUT.TEXT_INPUT_LABEL",
    value: value,
    disabled: false,
    required: required,
    minLength: minLength,
    maxLength: maxLength,
    valid: true,
    hooks: {
      textInputBlockDidLoad: "textInputBlockDidLoad",
      textInputBlockDidChange: "textInputBlockDidChange",
    },
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

const getCheckBoxConfirmer = function(index) {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBoxConfirmer = {
    id: index,
    type: "check-box-confirmer",
    label: "COMPONENT.CHECK_BOX_CONFIRMER.CHECK_BOX_CONFIRMER_LABEL",
    value: value,
    description: "COMPONENT.CHECK_BOX_CONFIRMER.CHECK_BOX_CONFIRMER_DESC",
    disabled: false,
    required: required,
    valid: required ? !!value : true,
    hooks: {
      checkBoxConfirmerBlockDidLoad: "checkBoxConfirmerBlockDidLoad",
      checkBoxConfirmerBlockDidChange: "checkBoxConfirmerBlockDidChange",
    },
  };

  return checkBoxConfirmer;
};

const getDatePicker = function(index) {
  const value = faker.date.future().toISOString();
  const required = faker.random.boolean();

  let datePicker = {
    id: index,
    type: "date-picker",
    label: "COMPONENT.DATE_PICKER.DATE_PICKER_LABEL",
    value: value,
    disabled: false,
    required: required,
    valid: required ? !!value : true,
    hooks: {
      datePickerBlockDidLoad: "datePickerBlockDidLoad",
      datePickerBlockDidChange: "datePickerBlockDidChange",
    },
  };

  return datePicker;
};

const getUnknownComponent = function(index) {
  return {
    id: index,
    type: "unknown",
  };
};

exports.getRandomB1Block = function(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(index);
  }
  else if (choice < 0.25) {
    return getCheckBox(index);
  }
  else if (choice < 0.50) {
    return getDropdown(index);
  }
  else if (choice < 0.75) {
    return getTextInput(index);
  }
  else {
    return getCheckBoxConfirmer(index);
  }
};

exports.getRandomB2Block = function(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(index);
  }
  else if (choice < 0.25) {
    return getCheckBox(index);
  }
  else if (choice < 0.50) {
    return getDropdown(index);
  }
  else if (choice < 0.75) {
    return getTextInput(index);
  }
  else {
    return getDatePicker(index);
  }
};
