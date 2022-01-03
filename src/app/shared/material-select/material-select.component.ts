import { FileSelectOption } from '../../models/test-case';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'my-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss'],
})
export class MaterialSelectComponent {
  @Input('options') options!: FileSelectOption[];
  @Input('selected') selected?: string;

  @Output('selectionChanged') selectionChanged: EventEmitter<string> =
    new EventEmitter();
  constructor() {
    this.options = [
      { value: 'Result.Pending', viewValue: 'Pending', selected: true },
      { value: 'Result.Failed', viewValue: 'Failed', selected: false },
      { value: 'Result.Success', viewValue: 'Success', selected: false },
    ];
    this.selected = this.options[0].value;
  }
  selectChanged(event: MatSelectChange) {
    // console.log(event.source);
    this.selectionChanged.emit(event.value);
  }
}
