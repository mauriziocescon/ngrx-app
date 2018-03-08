import { Component, Input, Output, EventEmitter } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import { DossierBlock } from "../../../models";

@Component({
  selector: "cp-dossier",
  templateUrl: "./dossier.component.html",
  styleUrls: ["./dossier.component.scss"]
})
export class DossierComponent {
  @Input() block: DossierBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<void>;

  constructor(protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<void>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }
}
