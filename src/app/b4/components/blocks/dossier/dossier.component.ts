import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

import { NGXLogger } from "ngx-logger";

import { DossierBlock } from "../../../models";

@Component({
  selector: "cp-dossier",
  templateUrl: "./dossier.component.html",
  styleUrls: ["./dossier.component.scss"]
})
export class DossierComponent implements OnInit {
  @Input() block: DossierBlock;
  @Input() loading: boolean;
  @Output() valueDidChange: EventEmitter<void>;

  dossierForm: FormGroup;

  protected textInput1Section1Control: FormControl;
  protected textInput2Section1Control: FormControl;
  protected checkBox1Section1Control: FormControl;

  protected textInput1Section2Control: FormControl;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.dossierForm = this.formBuilder.group({
      textInput1: this.block.section1.label1
    });
  }

  get isLoading(): boolean {
    return this.loading === true;
  }
}
