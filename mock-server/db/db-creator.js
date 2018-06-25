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
    instance = {id: faker.random.uuid(), module: 'b1', instance: faker.random.uuid(), step: '1', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomB1Block(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), module: 'b1', instance: faker.random.uuid(), step: '2', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomB1Block(i));
    }
    data.instances.push(instance);

    // module b2
    instance = {id: faker.random.uuid(), module: 'b2', instance: faker.random.uuid(), step: '1', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomB2Block(i));
    }
    data.instances.push(instance);

    instance = {id: faker.random.uuid(), module: 'b2', instance: faker.random.uuid(), step: '2', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomB2Block(i));
    }
    data.instances.push(instance);

    // module b3
    instance = {id: faker.random.uuid(), module: 'b3', instance: faker.random.uuid(), step: '1', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    // module b4
    instance = {id: '6', module: 'b4', instance: faker.random.uuid(), step: '1', blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(dataCreator.getRandomBlock(i));
    }
    data.instances.push(instance);

    // rules config
    data.rulesConfig.push({module: 'b1', steps: [{step: '1', rules: 'rules1'}, {step: '2', rules: 'rules2'}]});
    data.rulesConfig.push({module: 'b2', steps: [{step: '1', rules: 'rules1'}, {step: '2', rules: 'rules2'}]});
    data.rulesConfig.push({module: 'b3', steps: [{step: '1', rules: 'rules1'}]});

    utils.saveDb(dbUrl, data, (err) => {
      if (err) {
        throw err;
      }
      console.log('Json db created');
    });
  });
}

main();
