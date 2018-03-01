import { BlockType } from "./block-types";

export interface Block {
  id: string;
  type: BlockType;
  order: number;
}
