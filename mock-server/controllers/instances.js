const lowdb = require('../lowdb');

exports.getInstances = (req, res) => {
  const db = lowdb.getDb();
  const textSearch = req.query.textSearch;

  const lightInstances = db.get('instances')
    .map((inst) => {
      return {
        id: inst.id,
        description: inst.description,
      };
    })
    .filter((inst) => {
      return textSearch === undefined || textSearch === '' || JSON.stringify(inst).toLowerCase().includes(textSearch.toLowerCase());
    })
    .value();

  return res.status(200).jsonp(lightInstances);
};
