import { Block } from '../../shared';

export interface Instance {
  id: string;
  description: string;
  blocks: Block[];
}
