const lowdb = require('../lowdb');
const blocksValidation = require('../utils/blocks-validation');

exports.getBlocks = (req, res) => {
  const db = lowdb.getDb();
  const module = req.query.module;
  const instance = req.query.instance;
  const step = req.query.step;

  const foundInstance = db.get('instances')
    .find({module: module, instance: instance, step: step})
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
  const module = req.query.module;
  const instance = req.query.instance;
  const step = req.query.step;

  const foundInstance = db.get('instances')
    .find({module: module, instance: instance, step: step})
    .value();

  if (foundInstance) {
    let blocks = req.body.blocks.sort((b1, b2) => {
      return b1.order - b2.order;
    });

    // todo: refactor
    if (foundInstance.id === '6') {
      blocks = blocksValidation.validate(blocks);
    }

    db.get('instances')
      .find({module: module, instance: instance, step: step})
      .assign({blocks: blocks})
      .write();

    return res.status(200).jsonp(blocks);
  } else {
    return res.status(400).jsonp({
      error: 'Bad Request',
    });
  }
};
