const lowdb = require('../lowdb');

exports.getInstances = (req, res) => {
  const db = lowdb.getDb();
  const textSearch = req.query.textSearch;

  const lightInstances = db.get('instances')
    .map((instance) => {
      return {
        id: instance.id,
        module: instance.module,
        instance: instance.instance,
        step: instance.step,
      };
    })
    .filter((instance) => {
      return textSearch === '' || JSON.stringify(instance).includes(textSearch);
    })
    .value();

  return res.status(200).jsonp(lightInstances);
};
