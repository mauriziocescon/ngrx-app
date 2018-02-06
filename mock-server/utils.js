const fs = require("fs");

// delete db
exports.deleteDb = function() {
  if (fs.existsSync("./mock-server/db.json")) {
    console.log("File exists. Deleting now ...");
    fs.unlink("./mock-server/db.json");
  }
};

// save db
exports.saveDb = function(data) {
  fs.writeFile("mock-server/db.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      throw err;
    }
    console.log("Json db created");
  });
};
