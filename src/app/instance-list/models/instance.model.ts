import { Block } from '../../shared/shared.module';

export interface Instance {
  id: string;
  description: string;
  blocks: Block[];
}
