import { BlocksMethods } from "../../../dynamic-form/dynamic-form.module";

import { B1BlocksMethods } from "../../../b1/custom-blocks/b1.module";

import { B2BlocksMethods } from "../../../b2/custom-blocks/b2.module";

export interface CustomBlocksMethods extends BlocksMethods, B1BlocksMethods, B2BlocksMethods {
}
