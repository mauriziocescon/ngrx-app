const faker = require('faker');

const dataCreator = require('./data-creators');
const utils = require('./db-utils');
const dbUrl = require('./constants').dbUrl;

function main() {
  utils.deleteDb(dbUrl, (err) => {
    if (err) {
      throw err;
    }

    // db creation
    const data = {
      instances: [],
      logs: [],
    };

    // do items
    const numberOfInstances = faker.random.number({min: 1, max: 20});
    const numberOfBlocks = faker.random.number({min: 1, max: 20});

    for (let i = 0; i < numberOfInstances; i++) {
      let instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};

      for (let b = 0; b < numberOfBlocks; b++) {
        instance.blocks.push(dataCreator.getRandomBlock(b));
      }
      data.instances.push(instance);
    }

    utils.saveDb(dbUrl, data, (err) => {
      if (err) {
        throw err;
      }
      console.log('Json db created');
    });
  });
}

main();
