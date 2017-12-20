import { Injectable } from "@angular/core";

import { DropdownBlock } from "../../models";

@Injectable()
export class DropdownService {

  constructor() {
  }

  valueDidChange(block: {id: number, changes: DropdownBlock}): void {
    console.log(JSON.stringify(block));
  }
}
