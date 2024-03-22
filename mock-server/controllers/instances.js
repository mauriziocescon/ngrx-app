const lowdb = require('../lowdb');

exports.getInstances = (req, res) => {
  const db = lowdb.getDb();
  const textSearch = req.query.textSearch;

  const lightInstances = db.get('instances')
    .filter((inst) => {
      return textSearch === undefined || textSearch === '' || JSON.stringify({
        id: inst.id,
        description: inst.description
      })
        .toLowerCase()
        .includes(textSearch.toLowerCase());
    })
    .value();

  return res.status(200).jsonp(lightInstances);
};
