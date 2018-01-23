import { TextInputBlock } from "../../../base/dynamic-form/dynamic-form.module";

export const isValid = (textInputBlock: TextInputBlock) => {

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
