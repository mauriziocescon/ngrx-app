const faker = require("faker");

const getCheckBox = function(id) {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBox = {
    id: id,
    type: "check-box",
    order: parseInt(id),
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

const getDropdown = function(id) {
  const value = faker.random.boolean() ? "1" : undefined;
  const required = faker.random.boolean();

  let dropdown = {
    id: id,
    type: "dropdown",
    order: parseInt(id),
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

const getTextInput = function(id) {
  const value = faker.random.boolean() ? faker.lorem.words(faker.random.number(5)) : undefined;
  const required = faker.random.boolean();
  const minLength = required && faker.random.boolean() ? faker.random.number(5) : undefined;
  const maxLength = required && faker.random.boolean() ? faker.random.number({min: 5, max: 10}) : undefined;

  let textInput = {
    id: id,
    type: "text-input",
    order: parseInt(id),
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

const getCheckBoxConfirmer = function(id) {
  const value = faker.random.boolean() ? true : undefined;
  const required = faker.random.boolean();

  let checkBoxConfirmer = {
    id: id,
    type: "check-box-confirmer",
    order: parseInt(id),
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

const getDatePicker = function(id) {
  const value = faker.date.future().toISOString();
  const required = faker.random.boolean();

  let datePicker = {
    id: id,
    type: "date-picker",
    order: parseInt(id),
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

const getDossier = function(id) {

  let dossier = {
    id: id,
    type: "dossier",
    order: parseInt(id),
    valid: true,
    hooks: {
      dossierBlockDidLoad: "dossierBlockDidLoad",
      dossierBlockDidChange: "dossierBlockDidChange",
    },
  };

  return dossier;
};

const getUnknownComponent = function(id) {
  return {
    id: id,
    type: "unknown",
    order: parseInt(id),
  };
};

exports.getRandomBlock = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(id);
  }
  else if (choice < 0.35) {
    return getCheckBox(id);
  }
  else if (choice < 0.66) {
    return getDropdown(id);
  }
  else {
    return getTextInput(id);
  }
};

exports.getRandomB1Block = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(id);
  }
  else if (choice < 0.25) {
    return getCheckBox(id);
  }
  else if (choice < 0.50) {
    return getDropdown(id);
  }
  else if (choice < 0.75) {
    return getTextInput(id);
  }
  else {
    return getCheckBoxConfirmer(id);
  }
};

exports.getRandomB2Block = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(id);
  }
  else if (choice < 0.25) {
    return getCheckBox(id);
  }
  else if (choice < 0.50) {
    return getDropdown(id);
  }
  else if (choice < 0.75) {
    return getTextInput(id);
  }
  else {
    return getDatePicker(id);
  }
};

exports.getRandomB4Block = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(id);
  }
  else if (choice < 0.25) {
    return getCheckBox(id);
  }
  else if (choice < 0.50) {
    return getDropdown(id);
  }
  else if (choice < 0.75) {
    return getTextInput(id);
  }
  else {
    return getDossier(id);
  }
};
