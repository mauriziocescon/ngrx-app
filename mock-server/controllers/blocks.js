const db = require('../db/db.json');
const utils = require('../db/db-utils');
const blocksValidation = require('../utils/blocks-validation');
const dbUrl = require('../db/constants').dbUrl;

exports.getBlocks = (req, res) => {
  const instances = db.instances;
  const instance = instances.find((i) => {
    return i.module === req.query.module &&
      i.instance === req.query.instance &&
      i.step === req.query.step;
  });
  if (instance) {
    return res.status(200).jsonp(instance.blocks);
  } else {
    return res.status(400).jsonp({
      error: 'Bad Request',
    });
  }
};

exports.saveBlocks = (req, res) => {
  const instances = db.instances;
  const instance = instances.find((i) => {
    return i.module === req.body.module &&
      i.instance === req.body.instance &&
      i.step === req.body.step;
  });
  if (instance) {
    instance.blocks = req.body.blocks.sort((b1, b2) => {
      return b1.id - b2.id;
    });

    // hard coded validation
    if (instance.id === '6') {
      instance.blocks = blocksValidation.validate(instance.blocks);
    }

    utils.saveDb(dbUrl, db, (err) => {
      if (err) {
        return res.status(500).jsonp({
          error: err,
        });
      }
      return res.status(200).jsonp(instance.blocks);
    });
  } else {
    return res.status(400).jsonp({
      error: 'Bad Request',
    });
  }
};
