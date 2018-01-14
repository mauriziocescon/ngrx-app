var businessMethods = {};

(function () {

  // loading

  businessMethods.checkBoxBlockDidLoad = function(checkBoxBlock, blocksMethods) {
    console.log(`loadCheckBoxBlock: ${JSON.stringify(checkBoxBlock)}`);
  };

  businessMethods.dropdownBlockDidLoad = function(dropdownBlock, blocksMethods) {
    console.log(`loadDropdownBlock: ${JSON.stringify(dropdownBlock)}`);
  };

  businessMethods.textInputBlockDidLoad = function(textInputBlock, blocksMethods) {
    blocksMethods.textInput.setValueForBlockId("Reset initial value during TextInput load event", textInputBlock.id);
  };

  // status changed

  businessMethods.checkBoxBlockDidChange = function(checkBoxBlock, blocksMethods) {
    if (checkBoxBlock.value === true) {
      blocksMethods.setValueForBlockId(`When checkbox is true, reset to ${new Date().getTime()}`, 1);
    }
  };

  businessMethods.dropdownBlockDidChange = function(dropdownBlock, blocksMethods) {
    blocksMethods.textInput.setValueForBlockId(`When dropdown changes, reset to ${new Date().getTime()}`, 1);

    blocksMethods.textInput.changeLoading(true, 0);
    setTimeout(() => {
      blocksMethods.textInput.changeLoading(false, 0);
    }, 3000);
  };

  businessMethods.textInputBlockDidChange = function(textInputBlock, blocksMethods) {
    // do nothing
  };

})();
