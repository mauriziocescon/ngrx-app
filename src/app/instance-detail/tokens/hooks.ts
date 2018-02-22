import { BlocksHooks } from "../models/index";

export interface IBlockHooks {
  key: string;
  subscribeAll(hooks: BlocksHooks): void;
  unsubscribeAll(): void;
  getSetOfHooks(config: string): any;
}
