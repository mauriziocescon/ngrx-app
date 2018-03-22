import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { NGXLogger } from 'ngx-logger';

import { DossierBlock } from '../../../models';

@Component({
  selector: 'cp-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss'],
})
export class DossierComponent implements OnInit, OnChanges, OnDestroy {
  @Input() block: DossierBlock;
  @Input() loading: boolean;
  @Output() valuesDidChange: EventEmitter<{ value1Section1?: string, value2Section1?: string, value3Section1?: boolean, value1Section2?: string }>;

  dossierForm: FormGroup;

  // section 1
  protected textInput1Section1Control: FormControl;
  protected textInput2Section1Control: FormControl;
  protected checkBox1Section1Control: FormControl;

  protected textInput1Section1Subscription: Subscription;
  protected textInput2Section1Subscription: Subscription;
  protected checkBox1Section1Subscription: Subscription;

  // section 2
  protected textInput1Section2Control: FormControl;

  protected textInput1Section2Subscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valuesDidChange = new EventEmitter<{ value1Section1?: string, value2Section1?: string, value3Section1?: boolean, value1Section2?: string }>();
  }

  get isLoading(): boolean {
    return this.loading === true;
  }

  ngOnInit(): void {
    this.dossierForm = this.formBuilder.group({
      textInput1Section1: this.textInput1Section1Control = new FormControl(),
      textInput2Section1: this.textInput2Section1Control = new FormControl(),
      checkBox1Section1: this.checkBox1Section1Control = new FormControl(),

      textInput1Section2: this.textInput1Section2Control = new FormControl(),
    });
    this.setupFormControllers();

    this.subscribeAll();
  }

  protected setupFormControllers(): void {
    // section 1
    const textInput1Section1Validators = [
      ...this.insertIf(this.block.section1.required1, Validators.required),
    ];
    this.textInput1Section1Control.setValue(this.block.section1.value1);
    this.setDisableEnable(this.block.section1.disabled1, this.textInput1Section1Control);
    this.textInput1Section1Control.setValidators(textInput1Section1Validators);

    const textInput2Section1Validators = [
      ...this.insertIf(this.block.section1.required2, Validators.required),
    ];
    this.textInput2Section1Control.setValue(this.block.section1.value2);
    this.setDisableEnable(this.block.section1.disabled2, this.textInput2Section1Control);
    this.textInput2Section1Control.setValidators(textInput2Section1Validators);

    const checkBox1Section1Validators = [
      ...this.insertIf(this.block.section1.required3, Validators.required),
    ];
    this.checkBox1Section1Control.setValue(this.block.section1.value3);
    this.setDisableEnable(this.block.section1.disabled3, this.checkBox1Section1Control);
    this.checkBox1Section1Control.setValidators(checkBox1Section1Validators);

    // section 2
    const textInput1Section2Validators = [
      ...this.insertIf(this.block.section2.required1, Validators.required),
    ];
    this.textInput1Section2Control.setValue(this.block.section2.value1);
    this.setDisableEnable(this.block.section2.disabled1, this.textInput1Section2Control);
    this.textInput1Section2Control.setValidators(textInput1Section2Validators);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.block.isFirstChange()) {
      this.unsubscribeAll();
      this.setupFormControllers();
      this.subscribeAll();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  protected subscribeAll(): void {
    this.unsubscribeAll();

    this.textInput1Section1Subscription = this.textInput1Section1Control
      .valueChanges
      .debounceTime(500)
      .subscribe((value: string) => {
          this.valuesDidChange.emit({ value1Section1: value });
        },
        (e) => {
          this.logger.error(e.toString());
        });

    this.textInput2Section1Subscription = this.textInput2Section1Control
      .valueChanges
      .debounceTime(500)
      .subscribe((value: string) => {
          this.valuesDidChange.emit({ value2Section1: value });
        },
        (e) => {
          this.logger.error(e.toString());
        });

    this.checkBox1Section1Subscription = this.checkBox1Section1Control
      .valueChanges
      .debounceTime(500)
      .subscribe((value: boolean) => {
          this.valuesDidChange.emit({ value3Section1: value });
        },
        (e) => {
          this.logger.error(e.toString());
        });

    this.textInput1Section2Subscription = this.textInput1Section2Control
      .valueChanges
      .debounceTime(500)
      .subscribe((value: string) => {
          this.valuesDidChange.emit({ value1Section2: value });
        },
        (e) => {
          this.logger.error(e.toString());
        });
  }

  protected setDisableEnable(condition: boolean, control: FormControl): void {
    if (condition) {
      control.disable();
    } else {
      control.enable();
    }
  }

  protected insertIf(condition: boolean, element: any): any[] {
    return condition ? [element] : [];
  }

  protected unsubscribeAll(): void {
    // section 1
    if (this.textInput1Section1Subscription) {
      this.textInput1Section1Subscription.unsubscribe();
    }
    if (this.textInput2Section1Subscription) {
      this.textInput2Section1Subscription.unsubscribe();
    }
    if (this.checkBox1Section1Subscription) {
      this.checkBox1Section1Subscription.unsubscribe();
    }

    // section 2
    if (this.textInput1Section2Subscription) {
      this.textInput1Section2Subscription.unsubscribe();
    }
  }
}
