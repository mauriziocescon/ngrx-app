const isCheckBoxBlockValid = function(checkBoxBlock) {
  return checkBoxBlock.required ? !!checkBoxBlock.value : true;
};

const isDropdownBlockValid = function(dropdownBlock) {
  return dropdownBlock.required ? !!dropdownBlock.value : true;
};

const isTextInputBlockValid = function(textInputBlock) {
  if (textInputBlock.required && (!textInputBlock.value || !textInputBlock.value.length)) {
    return false;
  }
  if (textInputBlock.minLength >= 0 && textInputBlock.value !== undefined && textInputBlock.value.length < textInputBlock.minLength) {
    return false;
  }
  if (textInputBlock.maxLength >= 0 && textInputBlock.value !== undefined && textInputBlock.value.length > textInputBlock.maxLength) {
    return false;
  }
  return true;
};

exports.validate = function(blocks) {
  blocks.forEach((block) => {
    switch (block.type) {
      case 'check-box': {
        block.valid = isCheckBoxBlockValid(block);
        break;
      }
      case 'dropdown': {
        block.valid = isDropdownBlockValid(block);
        break;
      }
      case 'text-input': {
        block.valid = isTextInputBlockValid(block);
        break;
      }
      default: {
        block.valid = true;
      }
    }
  });
  return blocks;
};
