import { FileSelectOption } from '../../models/test-case';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Result } from 'src/app/models/test-case';

@Component({
  selector: 'material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss'],
})
export class MaterialSelectComponent {
  @Input('options') options!: FileSelectOption[];
  @Input('labelText') labelText: string = 'Selected file';

  @Output('selectionChanged') selectionChanged: EventEmitter<string> =
    new EventEmitter();

  constructor() {
    this.options = [
      { value: 'Result.Pending', viewValue: 'Pending' },
      { value: 'Result.Failed', viewValue: 'Failed safsf asfsaf.fd' },
      { value: 'Result.Success', viewValue: 'Success' },
    ];
  }
  selectChange(event: MatSelectChange) {
    // console.log(event.source);
    this.selectionChanged.emit(event.value);
  }
}
