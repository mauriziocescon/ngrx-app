var blockActionsObject = {};

(function() {

  var blocks = {};

  // blocks loaded
  // --------------
  blockActionsObject.checkBoxBlockDidLoad = function(checkBoxBlock, blockActions) {
    blocks[checkBoxBlock.id] = checkBoxBlock;
    console.log(`checkBoxBlockDidLoad: ${JSON.stringify(checkBoxBlock)}`);
  };

  // blocks changed
  // --------------
  blockActionsObject.checkBoxBlockDidChange = function(checkBoxBlock, blockActions) {
    blocks[checkBoxBlock.id] = checkBoxBlock;
    console.log(`checkBoxBlockDidChange: ${JSON.stringify(checkBoxBlock)}`);
  };

})();
