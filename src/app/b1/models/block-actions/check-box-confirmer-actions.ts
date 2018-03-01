export interface CheckBoxConfirmerActions {
  changeLoading: (loading: boolean, blockId: string) => void;
  setLabelForBlockId: (label: string, blockId: string) => void;
  setValueForBlockId: (value: boolean, blockId: string) => void;
  setDescriptionForBlockId: (description: string, blockId: string) => void;
  setRequiredForBlockId: (required: boolean, blockId: string) => void;
  setDisabledForBlockId: (disabled: boolean, blockId: string) => void;
  setValidityForBlockId: (valid: boolean, blockId: string) => void;
}
