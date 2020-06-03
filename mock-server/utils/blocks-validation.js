const isCheckBoxBlockValid = (checkBoxBlock) => {
  return checkBoxBlock.required ? !!checkBoxBlock.value : true;
};

const isCheckBoxConfirmerBlockValid = (checkBoxConfirmer) => {
  return checkBoxConfirmer.required ? !!checkBoxConfirmer.value : true;
};

const isDatePickerBlockValid = (datePickerBlock) => {
  return datePickerBlock.required ? !!datePickerBlock.value : true;
};

const isDropdownBlockValid = (dropdownBlock) => {
  return dropdownBlock.required ? !!dropdownBlock.value : true;
};

const isTextInputBlockValid = (textInputBlock) => {
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

exports.validate = (blocks) => {
  blocks.forEach((block) => {
    switch (block.type) {
      case 'check-box': {
        block.valid = isCheckBoxBlockValid(block);
        break;
      }
      case 'check-box-confirmer': {
        block.valid = isCheckBoxConfirmerBlockValid(block);
        break;
      }
      case 'date-picker': {
        block.valid = isDatePickerBlockValid(block);
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
