const unknown = require('./unknown');
const checkBox = require('./check-box');
const checkBoxConfirmer = require('./check-box-confirmer');
const datePicker = require('./date-picker');
const dropdown = require('./dropdown');
const textInput = require('./text-input');

exports.getRandomBlock = (index) => {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(index);
  }
  else if (choice < 0.20) {
    return checkBox.getCheckBox(index);
  }
  else if (choice < 0.40) {
    return checkBoxConfirmer.getCheckBoxConfirmer(index);
  }
  else if (choice < 0.60) {
    return datePicker.getDatePicker(index);
  }
  else if (choice < 0.80) {
    return dropdown.getDropdown(index);
  }
  else {
    return textInput.getTextInput(index);
  }
};
