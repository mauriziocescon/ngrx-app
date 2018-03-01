export interface TextInputActions {
  changeLoading: (loading: boolean, blockId: string) => void;
  setLabelForBlockId: (label: string, blockId: string) => void;
  setValueForBlockId: (value: string, blockId: string) => void;
  setRequiredForBlockId: (required: boolean, blockId: string) => void;
  setMinLengthForBlockId: (minLength: number, blockId: string) => void;
  setMaxLengthForBlockId: (maxLength: number, blockId: string) => void;
  setDisabledForBlockId: (disabled: boolean, blockId: string) => void;
  setValidityForBlockId: (valid: boolean, blockId: string) => void;
}
