import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import { BlockRulesService } from "../../../base/dynamic-form/dynamic-form.module";

@Injectable()
export class CustomBlockRulesService extends BlockRulesService {

  constructor(protected logger: NGXLogger) {
    super(logger);
  }
}
