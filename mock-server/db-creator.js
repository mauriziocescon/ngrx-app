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
const numberOfBlocks = 5;

function getCheckBox(index) {
  return {
    id: index,
    type: "check-box",
    label: "COMPONENT.CHECK_BOX.CHECK_BOX_LABEL",
    value: faker.random.boolean() ? true : undefined,
    description: "COMPONENT.CHECK_BOX.CHECK_BOX_DESC",
    disabled: false,
    required: faker.random.boolean(),
  };
}

function getDropdown(index) {
  return {
    id: index,
    type: "dropdown",
    label: "COMPONENT.DROPDOWN.DROPDOWN_LABEL",
    value: faker.random.boolean() ? "1" : undefined,
    choices: ["1", "2", "3"],
    disabled: false,
    required: faker.random.boolean(),
  };
}

function getTextInput(index) {
  return {
    id: index,
    type: "text-input",
    label: "COMPONENT.TEXT_INPUT.TEXT_INPUT_LABEL",
    value: faker.random.boolean() ? faker.lorem.words(faker.random.number(5)) : undefined,
    disabled: false,
    required: faker.random.boolean(),
    minLength: faker.random.boolean() ? faker.random.number(5) : undefined,
    maxLength: faker.random.boolean() ? faker.random.number({min: 5, max: 10}) : undefined,
  };
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
