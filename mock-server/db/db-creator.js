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
      rulesConfig: [],
      instances: [],
      logs: [],
    };

    // do items
    const numberOfBlocks = 7;

    let instance;

    // module b1
    instance = {id: faker.random.uuid(), instance: 'inst-1', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), instance: 'inst-2', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    // module b2
    instance = {id: faker.random.uuid(), instance: 'inst-3', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), instance: 'inst-4', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    // module b3
    instance = {id: faker.random.uuid(), instance: 'inst-5', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    // module b4
    instance = {id: faker.random.uuid(), instance: 'inst-6', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    // rules config
    data.rulesConfig.push({instance: 'inst-1', rules: 'rules1'});

    utils.saveDb(dbUrl, data, (err) => {
      if (err) {
        throw err;
      }
      console.log('Json db created');
    });
  });
}

main();
