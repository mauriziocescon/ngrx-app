const faker = require('faker');

const unknown = require('./unknown');
const checkBox = require('./check-box');
const checkBoxConfirmer = require('./check-box-confirmer');
const datePicker = require('./date-picker');
const dropdown = require('./dropdown');
const textInput = require('./text-input');

// db creation
const mocks = {
  instances: [],
  logs: [],
};

const getRandomBlock = (index) => {
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

// #items
const numberOfInstances = faker.random.number({min: 1, max: 20});

for (let i = 0; i < numberOfInstances; i++) {
  let instance = {id: faker.random.uuid(), description: faker.lorem.sentences(), blocks: []};

  const numberOfBlocks = faker.random.number({min: 1, max: 10});

  for (let b = 0; b < numberOfBlocks; b++) {
    instance.blocks.push(getRandomBlock(b));
  }
  mocks.instances.push(instance);
}

exports.mocks = mocks;
