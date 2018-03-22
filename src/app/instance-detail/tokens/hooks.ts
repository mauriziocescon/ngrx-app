import { BlockHooks } from '../models';

export interface IBlockHooks {
  module: string;

  subscribeAll(hooks: BlockHooks): void;

  unsubscribeAll(): void;

  getSetOfHooks(config: string): any;
}
