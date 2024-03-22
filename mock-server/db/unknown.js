const faker = require('faker');

exports.getUnknownComponent = (index) => ({
  id: faker.datatype.uuid(),
  type: 'unknown',
  order: parseInt(index),
  valid: true,
});
