import { Injectable } from "@angular/core";

import { TextInputBlock } from "../../models";

@Injectable()
export class TextInputService {

  constructor() {
  }

  valueDidChange(block: {id: number, changes: TextInputBlock}): void {
    console.log(JSON.stringify(block));
  }
}
