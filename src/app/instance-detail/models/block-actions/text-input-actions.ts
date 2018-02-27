export interface TextInputActions {
  changeLoading: (loading: boolean, blockId: number) => void;
  setLabelForBlockId: (label: string, blockId: number) => void;
  setValueForBlockId: (value: string, blockId: number) => void;
  setRequiredForBlockId: (required: boolean, blockId: number) => void;
  setMinLengthForBlockId: (minLength: number, blockId: number) => void;
  setMaxLengthForBlockId: (maxLength: number, blockId: number) => void;
  setDisabledForBlockId: (disabled: boolean, blockId: number) => void;
  setValidityForBlockId: (valid: boolean, blockId: number) => void;
}
