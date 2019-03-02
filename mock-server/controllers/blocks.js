const lowdb = require('../lowdb');
const blocksValidation = require('../utils/blocks-validation');

exports.getBlocks = (req, res) => {
  const db = lowdb.getDb();
  const instanceId = req.query.instanceId;

  const foundInstance = db.get('instances')
    .find({id: instanceId})
    .value();

  if (foundInstance) {
    return res.status(200).jsonp(foundInstance.blocks);
  } else {
    return res.status(400).jsonp({
      error: 'Bad Request',
    });
  }
};

exports.saveBlocks = (req, res) => {
  const db = lowdb.getDb();
  const instanceId = req.body.instanceId;
  const newBlocks = req.body.blocks;

  const foundInstance = db.get('instances')
    .find({id: instanceId})
    .value();

  if (foundInstance) {
    const currentBlocks = foundInstance.blocks;

    let blocksMap = {};
    currentBlocks.forEach(block => blocksMap[block.id] = block);
    newBlocks.forEach(block => blocksMap[block.id] = block);
    let blocks = Object.keys(blocksMap).map(key => blocksMap[key]);
    blocks = blocks.sort((b1, b2) => {
      return b1.order - b2.order;
    });

    blocks = blocksValidation.validate(blocks);

    db.get('instances')
      .find({id: instanceId})
      .assign({blocks: blocks})
      .write();

    return res.status(200).jsonp(blocks);
  } else {
    return res.status(400).jsonp({
      error: 'Bad Request',
    });
  }
};
