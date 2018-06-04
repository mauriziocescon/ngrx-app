const faker = require('faker');

exports.getUnknownComponent = (index) => {
  return {
    id: faker.random.uuid(),
    type: 'unknown',
    order: parseInt(index),
  };
};
