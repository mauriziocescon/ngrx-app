const blockCreator = require("./block-creator");
const utils = require("./utils");

const dbUrl = "./mock-server/db.json";

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
    instance = {id: "0", module: "b1", instance: "1", step: "1", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomB1Block(i.toString()));
    }
    data.instances.push(instance);

    instance = {id: "1", module: "b1", instance: "1", step: "2", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomB1Block(i.toString()));
    }
    data.instances.push(instance);

    // module b2
    instance = {id: "2", module: "b2", instance: "1", step: "1", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomB2Block(i.toString()));
    }
    data.instances.push(instance);

    instance = {id: "3", module: "b2", instance: "1", step: "2", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomB2Block(i.toString()));
    }
    data.instances.push(instance);

    // module b3
    instance = {id: "4", module: "b3", instance: "1", step: "1", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomBlock(i.toString()));
    }
    data.instances.push(instance);

    // module b4
    instance = {id: "5", module: "b4", instance: "1", step: "1", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomB4Block(i.toString()));
    }
    data.instances.push(instance);

    // module b5
    instance = {id: "6", module: "b5", instance: "1", step: "1", blocks: []};
    for (let i = 0; i < numberOfBlocks; i++) {
      instance.blocks.push(blockCreator.getRandomBlock(i.toString()));
    }
    data.instances.push(instance);

    // rules config
    data.rulesConfig.push({module: "b1", steps: [{step: "1", rules: "rules1"}, {step: "2", rules: "rules2"}]});
    data.rulesConfig.push({module: "b2", steps: [{step: "1", rules: "rules1"}, {step: "2", rules: "rules2"}]});
    data.rulesConfig.push({module: "b3", steps: [{step: "1", rules: "rules1"}]});
    data.rulesConfig.push({module: "b4", steps: [{step: "1", rules: "rules1"}]});

    utils.saveDb(dbUrl, data, (err) => {
      if (err) {
        throw err;
      }
      console.log("Json db created");
    });
  });
}

main();
