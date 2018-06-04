const unknown = require('./base/unknown');
const checkBox = require('./base/check-box');
const dropdown = require('./base/dropdown');
const textInput = require('./base/text-input');

const checkBoxConfirmer = require('./b1/check-box-confirmer');
const datePicker = require('./b2/date-picker');
const dossier = require('./b4/dossier');

exports.getRandomBlock = function(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(index);
  }
  else if (choice < 0.35) {
    return checkBox.getCheckBox(index);
  }
  else if (choice < 0.66) {
    return dropdown.getDropdown(index);
  }
  else {
    return textInput.getTextInput(index);
  }
};

exports.getRandomB1Block = function(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(index);
  }
  else if (choice < 0.25) {
    return checkBox.getCheckBox(index);
  }
  else if (choice < 0.50) {
    return dropdown.getDropdown(index);
  }
  else if (choice < 0.75) {
    return textInput.getTextInput(index);
  }
  else {
    return checkBoxConfirmer.getCheckBoxConfirmer(index);
  }
};

exports.getRandomB2Block = function(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(index);
  }
  else if (choice < 0.25) {
    return checkBox.getCheckBox(index);
  }
  else if (choice < 0.50) {
    return dropdown.getDropdown(index);
  }
  else if (choice < 0.75) {
    return textInput.getTextInput(index);
  }
  else {
    return datePicker.getDatePicker(index);
  }
};

exports.getRandomB4Block = function(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return unknown.getUnknownComponent(index);
  }
  else if (choice < 0.25) {
    return checkBox.getCheckBox(index);
  }
  else if (choice < 0.50) {
    return dropdown.getDropdown(index);
  }
  else if (choice < 0.75) {
    return textInput.getTextInput(index);
  }
  else {
    return dossier.getDossier(index);
  }
};
