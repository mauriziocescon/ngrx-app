import { BlocksMethods } from "../../../dynamic-form/dynamic-form.module";

import { B1BlocksMethods } from "../../../b1";

import { B2BlocksMethods } from "../../../b2";

export interface CustomBlocksMethods extends BlocksMethods, B1BlocksMethods, B2BlocksMethods {
}
