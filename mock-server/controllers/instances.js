const db = require('../db/db.json');

exports.getInstances = (req, res) => {
  const instances = db.instances;
  const lightInstances = instances.map((instance) => {
    return {
      id: instance.id,
      module: instance.module,
      instance: instance.instance,
      step: instance.step,
    };
  });
  return res.status(200).jsonp(lightInstances);
};
