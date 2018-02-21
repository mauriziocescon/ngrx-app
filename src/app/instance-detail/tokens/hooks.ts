import { BlocksHooks } from "../models/index";

export interface IBlockHooks {
  key: string;
  subscribeAll(hooks: BlocksHooks): void;
  unsubscribeAll(): void;
  getSetOfHooks(module: string, name: string): any;
}
