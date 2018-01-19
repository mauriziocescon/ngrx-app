export interface DropdownMethods {
  changeLoading: (loading: boolean, blockId: number) => void;
  setLabelForBlockId: (label: string, blockId: number) => void;
  setValueForBlockId: (value: string, blockId: number) => void;
  setChoicesForBlockId: (choices: string[], blockId: number) => void;
  setRequiredForBlockId: (required: boolean, blockId: number) => void;
  setDisabledForBlockId: (disabled: boolean, blockId: number) => void;
}
