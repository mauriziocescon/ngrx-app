var businessMethods = {};

(function() {

  var blocks = {};

  // loading

  businessMethods.checkBoxBlockDidLoad = function(checkBoxBlock, blocksMethods) {
    blocks[checkBoxBlock.id] = checkBoxBlock;
    console.log(`checkBoxBlockDidLoad: ${JSON.stringify(checkBoxBlock)}`);
  };

  businessMethods.dropdownBlockDidLoad = function(dropdownBlock, blocksMethods) {
    blocks[dropdownBlock.id] = dropdownBlock;
    console.log(`dropdownBlockDidLoad: ${JSON.stringify(dropdownBlock)}`);
  };

  businessMethods.textInputBlockDidLoad = function(textInputBlock, blocksMethods) {
    blocks[textInputBlock.id] = textInputBlock;
    console.log(`textInputBlockDidLoad: ${JSON.stringify(textInputBlock)}`);

    blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
  };

  businessMethods.checkBoxConfirmerBlockDidLoad = function(checkBoxConfirmerBlock, blocksMethods) {
    blocks[checkBoxConfirmerBlock.id] = checkBoxConfirmerBlock;
    console.log(`checkBoxConfirmerBlockDidLoad: ${JSON.stringify(checkBoxConfirmerBlock)}`);
  };

  // status changed
  businessMethods.checkBoxBlockDidChange = function(checkBoxBlock, blocksMethods) {
    console.log(`checkBoxBlockDidChange: ${JSON.stringify(checkBoxBlock)}`);

    if (checkBoxBlock.value === true) {
      blocksMethods.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 0);
    }
  };

  businessMethods.dropdownBlockDidChange = function(dropdownBlock, blocksMethods) {
    console.log(`dropdownBlockDidChange: ${JSON.stringify(dropdownBlock)}`);

    blocksMethods.textInput.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 0);

    blocksMethods.dropdown.changeLoading(true, dropdownBlock.id);
    setTimeout(() => {
      var newChoices = blocks[dropdownBlock.id].choices.concat(["4", "5"]);
      blocksMethods.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
      blocksMethods.dropdown.changeLoading(false, dropdownBlock.id);
    }, 3000);
  };

  businessMethods.textInputBlockDidChange = function(textInputBlock, blocksMethods) {
    console.log(`textInputBlockDidChange: ${JSON.stringify(textInputBlock)}`);
  };

  businessMethods.checkBoxConfirmerBlockDidChange = function(checkBoxConfirmerBlock, blocksMethods) {
    console.log(`checkBoxConfirmerBlockDidChange: ${JSON.stringify(checkBoxConfirmerBlock)}`);
  };

})();
