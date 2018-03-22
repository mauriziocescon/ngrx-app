const db = require('../db/db.json');

exports.getRulesConfig = (req, res) => {
  const rulesConfig = db.rulesConfig;
  const module = rulesConfig.find((config) => {
    return config.module === req.query.module;
  });

  if (module) {
    const index = module.steps.findIndex((config) => {
      return config.step === req.query.step;
    });
    if (index !== -1) {
      return res.status(200).jsonp(module.steps[index].rules);
    } else {
      return res.status(400).jsonp({
        error: 'Bad Request',
      });
    }
  }
  return res.status(200).jsonp('not_found');
};
