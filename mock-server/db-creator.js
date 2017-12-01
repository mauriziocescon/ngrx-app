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

// albums
for (let i = 0; i < numberOfBlocks; i++) {
  data.blocks.push({
    id: i + 1,
    type: ["check-box", "dropdown", "text-input"][(Math.random() * 100) % 3],
  });
}

// save file
fs.writeFile("mock-server/db.json", JSON.stringify(data, null, 2), (err) => {
  if (err) {
    throw err;
  }
  console.log("Json db created");
});
