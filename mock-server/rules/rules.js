var businessMethods = {};

(function () {

  var blocks = {};

  // loading

  businessMethods.checkBoxBlockDidLoad = function(checkBoxBlock, blocksMethods) {
    blocks[checkBoxBlock.id] = checkBoxBlock;
    console.log(`loadCheckBoxBlock: ${JSON.stringify(checkBoxBlock)}`);
  };

  businessMethods.dropdownBlockDidLoad = function(dropdownBlock, blocksMethods) {
    blocks[dropdownBlock.id] = dropdownBlock;
    console.log(`loadDropdownBlock: ${JSON.stringify(dropdownBlock)}`);
  };

  businessMethods.textInputBlockDidLoad = function(textInputBlock, blocksMethods) {
    blocks[textInputBlock.id] = textInputBlock;
    blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
  };

  // status changed

  businessMethods.checkBoxBlockDidChange = function(checkBoxBlock, blocksMethods) {
    if (checkBoxBlock.value === true) {
      blocksMethods.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 0);
    }
  };

  businessMethods.dropdownBlockDidChange = function(dropdownBlock, blocksMethods) {
    blocksMethods.textInput.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 0);

    blocksMethods.textInput.changeLoading(true, 0);
    setTimeout(() => {
      blocksMethods.textInput.changeLoading(false, 0);

      var newChoices = blocks[3].choices.concat(["4", "5"]);
      // blocksMethods.dropdown.setChoicesForBlockId(newChoices, 3);
    }, 3000);
  };

  businessMethods.textInputBlockDidChange = function(textInputBlock, blocksMethods) {
    // do nothing
  };

})();
