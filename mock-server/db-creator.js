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
const numberOfBlocks = 10;

function getCheckBox(index) {
  return {
    id: index,
    type: "check-box",
    label: "CHECK_BOX_LABEL",
    value: faker.random.boolean(),
    description: "CHECK_BOX_DESC",
    required: faker.random.boolean(),
  };
}

function getDropdown(index) {
  return {
    id: index,
    type: "dropdown",
    label: "DROPDOWN_LABEL",
    value: "first",
    choices: ["first", "second", "third"],
    required: faker.random.boolean(),
  };
}

function getTextInput(index) {
  return {
    id: index,
    type: "text-input",
    label: "TEXT_INPUT_LABEL",
    value: faker.lorem.words(faker.random.number(5)),
    required: faker.random.boolean(),
    minLength: faker.random.boolean() ? faker.random.number(5) : undefined,
    maxLength: faker.random.boolean() ? faker.random.number({min: 5, max: 10}) : undefined,
  };
}

function getRandomBlock(index) {
  const choice = Math.random();

  if (choice < 0.33) {
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
