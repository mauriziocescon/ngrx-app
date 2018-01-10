const fs = require("fs");
const faker = require("faker");

// delete db
if (fs.existsSync("./mock-server/db.json")) {
  console.log("File exists. Deleting now ...");
  fs.unlink("./mock-server/db.json");
}

// db creation
const data = {
  blocks: [],
};

// do items
const numberOfBlocks = 7;

function getCheckBox(index) {
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
  };

  return checkBox;
}

function getDropdown(index) {
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
  };

  return dropdown;
}

function getTextInput(index) {
  const value = faker.random.boolean() ? faker.lorem.words(faker.random.number(5)) : undefined;
  const required = faker.random.boolean();
  const minLength = faker.random.boolean() ? faker.random.number(5) : undefined;
  const maxLength = faker.random.boolean() ? faker.random.number({min: 5, max: 10}) : undefined;

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
  };

  if (required && (!value || !value.length)) {
    textInput.valid = false;
    return textInput;
  }

  if (minLength >= 0 && value.length < minLength) {
    textInput.valid = false;
    return textInput;
  }

  if (maxLength >= 0 && value.length > maxLength) {
    textInput.valid = false;
    return textInput;
  }

  return textInput;
}

function getUnknownComponent(index) {
  return {
    id: index,
    type: "unknown",
  };
}

function getRandomBlock(index) {
  const choice = Math.random();

  if (choice < 0.05) {
    return getUnknownComponent(index);
  }
  else if (choice < 0.33) {
    return getCheckBox(index);
  }
  else if (choice < 0.66) {
    return getDropdown(index);
  }
  else {
    return getTextInput(index);
  }
}

// blocks
for (let i = 0; i < numberOfBlocks; i++) {
  data.blocks.push(getRandomBlock(i));
}

// save file
fs.writeFile("mock-server/db.json", JSON.stringify(data, null, 2), (err) => {
  if (err) {
    throw err;
  }
  console.log("Json db created");
});
