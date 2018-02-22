exports.validate = function (blocks) {
  blocks.forEach((block) => {
    block.valid = true;
  });
  return blocks;
};
