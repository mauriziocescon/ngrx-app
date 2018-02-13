const fs = require("fs");

// delete db
exports.deleteDb = function(path, callback) {
  fs.unlink(path, callback);
};

// save db
exports.saveDb = function(path, data, callback) {
  fs.writeFile(path, JSON.stringify(data, null, 2), callback);
};
