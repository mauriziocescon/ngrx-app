const blockCreator = require("./block-creator");
const utils = require("./utils");

function main() {
  utils.deleteDb();

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
  instance = {id: 0, module: "b1", instance: "1", step: "1", blocks: []};
  for (let i = 0; i < numberOfBlocks; i++) {
    instance.blocks.push(blockCreator.getRandomB1Block(i));
  }
  data.instances.push(instance);

  instance = {id: 1, module: "b1", instance: "1", step: "2", blocks: []};
  for (let i = 0; i < numberOfBlocks; i++) {
    instance.blocks.push(blockCreator.getRandomB1Block(i));
  }
  data.instances.push(instance);

  // module b2
  instance = {id: 2, module: "b2", instance: "1", step: "1", blocks: []};
  for (let i = 0; i < numberOfBlocks; i++) {
    instance.blocks.push(blockCreator.getRandomB2Block(i));
  }
  data.instances.push(instance);

  instance = {id: 3, module: "b2", instance: "1", step: "2", blocks: []};
  for (let i = 0; i < numberOfBlocks; i++) {
    instance.blocks.push(blockCreator.getRandomB2Block(i));
  }
  data.instances.push(instance);

  // rules config
  data.rulesConfig.push({module: "b1", steps: [{step: "1", rules: "b1-rules1"}, {step: "2", rules: "b1-rules2"}]});
  data.rulesConfig.push({module: "b2", steps: [{step: "1", rules: "b2-rules1"}, {step: "2", rules: "b2-rules2"}]});

  utils.saveDb(data);
}

main();
