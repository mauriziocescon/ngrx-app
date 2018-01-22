export interface CheckBoxConfirmerMethods {
  changeLoading: (loading: boolean, blockId: number) => void;
  setLabelForBlockId: (label: string, blockId: number) => void;
  setValueForBlockId: (value: boolean, blockId: number) => void;
  setDescriptionForBlockId: (description: string, blockId: number) => void;
  setRequiredForBlockId: (required: boolean, blockId: number) => void;
  setDisabledForBlockId: (disabled: boolean, blockId: number) => void;
}
