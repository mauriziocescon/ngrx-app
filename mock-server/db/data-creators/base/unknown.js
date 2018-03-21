const faker = require("faker");

exports.getUnknownComponent = (id) => {
  return {
    id: id,
    type: "unknown",
    order: parseInt(id),
  };
};
