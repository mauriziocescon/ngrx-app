export interface DropdownActions {
  changeLoading: (loading: boolean, blockId: string) => void;
  setLabelForBlockId: (label: string, blockId: string) => void;
  setValueForBlockId: (value: string, blockId: string) => void;
  setChoicesForBlockId: (choices: string[], blockId: string) => void;
  setRequiredForBlockId: (required: boolean, blockId: string) => void;
  setDisabledForBlockId: (disabled: boolean, blockId: string) => void;
  setValidityForBlockId: (valid: boolean, blockId: string) => void;
}
