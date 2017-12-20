import { Injectable } from "@angular/core";

import { CheckBoxBlock } from "../../models";

@Injectable()
export class CheckBoxService {

  constructor() {
  }

  valueDidChange(block: {id: number, changes: CheckBoxBlock}): void {
    console.log(JSON.stringify(block));
  }
}
