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
    console.log(`textInputBlockDidLoad: ${JSON.stringify(textInputBlock)}`);

    // blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
  };

  // status changed

  businessMethods.checkBoxBlockDidChange = function(checkBoxBlock, blocksMethods) {
    console.log(`checkBoxBlockDidChange: ${JSON.stringify(checkBoxBlock)}`);

    // if (checkBoxBlock.value === true) {
    //   blocksMethods.textInput.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 0);
    // }
  };

  var addChoicesOpIsOnGoing = false;

  businessMethods.dropdownBlockDidChange = function(dropdownBlock, blocksMethods) {
    console.log(`dropdownBlockDidChange: ${JSON.stringify(dropdownBlock)}`);

    // blocksMethods.textInput.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 0);

    if (!addChoicesOpIsOnGoing) {
      addChoicesOpIsOnGoing = true;
      blocksMethods.dropdown.changeLoading(true, 0);
      setTimeout(() => {
        var newChoices = blocks[dropdownBlock.id].choices.concat(["4", "5"]);
        blocksMethods.dropdown.setChoicesForBlockId(newChoices, dropdownBlock.id);
        blocksMethods.dropdown.changeLoading(false, 0);
        addChoicesOpIsOnGoing = false;
      }, 3000);
    }
  };

  businessMethods.textInputBlockDidChange = function(textInputBlock, blocksMethods) {
    console.log(`textInputBlockDidChange: ${JSON.stringify(textInputBlock)}`);
  };

})();
