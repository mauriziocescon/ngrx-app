const unknown = require('./base/unknown');
const checkBox = require('./base/check-box');
const dropdown = require('./base/dropdown');
const textInput = require('./base/text-input');

const checkBoxConfirmer = require('./b1/check-box-confirmer');
const datePicker = require('./b2/date-picker');
const dossier = require('./b4/dossier');

exports.getRandomBlock = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(id);
  }
  else if (choice < 0.35) {
    return checkBox.getCheckBox(id);
  }
  else if (choice < 0.66) {
    return dropdown.getDropdown(id);
  }
  else {
    return textInput.getTextInput(id);
  }
};

exports.getRandomB1Block = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(id);
  }
  else if (choice < 0.25) {
    return checkBox.getCheckBox(id);
  }
  else if (choice < 0.50) {
    return dropdown.getDropdown(id);
  }
  else if (choice < 0.75) {
    return textInput.getTextInput(id);
  }
  else {
    return checkBoxConfirmer.getCheckBoxConfirmer(id);
  }
};

exports.getRandomB2Block = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(id);
  }
  else if (choice < 0.25) {
    return checkBox.getCheckBox(id);
  }
  else if (choice < 0.50) {
    return dropdown.getDropdown(id);
  }
  else if (choice < 0.75) {
    return textInput.getTextInput(id);
  }
  else {
    return datePicker.getDatePicker(id);
  }
};

exports.getRandomB4Block = function(id) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(id);
  }
  else if (choice < 0.25) {
    return checkBox.getCheckBox(id);
  }
  else if (choice < 0.50) {
    return dropdown.getDropdown(id);
  }
  else if (choice < 0.75) {
    return textInput.getTextInput(id);
  }
  else {
    return dossier.getDossier(id);
  }
};
