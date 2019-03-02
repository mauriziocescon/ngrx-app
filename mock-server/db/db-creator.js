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
    const numberOfBlocks = 7;

    let instance;

    instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), description: faker.random.words(), blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    utils.saveDb(dbUrl, data, (err) => {
      if (err) {
        throw err;
      }
      console.log('Json db created');
    });
  });
}

main();
