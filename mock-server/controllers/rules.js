const lowdb = require('../lowdb');

exports.getRulesConfig = (req, res) => {
  const db = lowdb.getDb();
  const module = req.query.module;
  const step = req.query.step;

  const foundModule = db.get('rulesConfig')
    .find({module: module})
    .value();

  if (foundModule) {
    const index = foundModule.steps.findIndex((config) => {
      return config.step === step;
    });
    if (index !== -1) {
      return res.status(200).jsonp(foundModule.steps[index].rules);
    } else {
      return res.status(400).jsonp({
        error: 'Bad Request',
      });
    }
  }
  return res.status(200).jsonp('not_found');
};
