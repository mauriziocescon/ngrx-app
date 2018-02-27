import { BlockHooks } from "../models/index";

export interface IBlockHooks {
  key: string;
  subscribeAll(hooks: BlockHooks): void;
  unsubscribeAll(): void;
  getSetOfHooks(config: string): any;
}
