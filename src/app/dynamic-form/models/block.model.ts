export enum BlockType {
  CheckBox = "check-box",
  Dropdown = "dropdown",
  TextInput = "text-input",
}

export interface Block {
  id: string;
  type: BlockType;
}
