import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

import { ValidityStateDirective } from '../../../../../shared';

import { DatePickerBlock } from '../../../../models';

@Component({
  selector: 'app-date-picker-cp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgbDatepickerModule,
    ValidityStateDirective,
  ],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <span>{{ "COMPONENT.DATE_PICKER.HEADER" | translate }}</span>&nbsp;
              <span appValidityState [valid]="block.valid"></span>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group row">
                  <label for="{{ block.id }}" class="col-sm-2 col-form-label">{{ block.label | translate }}</label>
                  <div class="col-sm-10">
                    <div class="input-group">
                      <input class="form-control" id="{{ block.id }}"
                             name="dp" [(ngModel)]="selectedDate" (ngModelChange)="onChange($event)" ngbDatepicker
                             #d="ngbDatepicker" [navigation]="'arrows'" placeholder="yyyy-mm-dd">
                      <div class="input-group-append">
                        <button class="btn btn-primary addon" (click)="d.toggle()" type="button">
                          <span class="fas fa-calendar"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`
    .date-picker-component {

      .addon {
        color: var(--accent-color);
      }
    }
  `],
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() block: DatePickerBlock;
  @Output() valueDidChange: EventEmitter<string>;

  selectedDate: NgbDateStruct;

  constructor(protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    const date = this.block.value ? new Date(this.block.value) : new Date();
    this.selectedDate = this.fromModel(date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['block'].isFirstChange()) {
      const date = this.block.value ? new Date(this.block.value) : new Date();
      this.selectedDate = this.fromModel(date);
    }
  }

  onChange(date: NgbDateStruct): void {
    this.valueDidChange.emit(this.toModel(date).toISOString());
  }

  protected fromModel(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  protected toModel(date: NgbDateStruct): Date {
    return new Date(date.year, date.month - 1, date.day);
  }
}
