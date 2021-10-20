import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from 'src/app/models/test-case';

@Component({
  selector: 'material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss'],
})
export class MaterialSelectComponent {
  @Input('result') result!: number;

  @Output('resultChanged') resultChanged: EventEmitter<string> =
    new EventEmitter();
  resultOptions: any[] = [
    { value: Result.Pending, viewValue: 'Pending' },
    { value: Result.Failed, viewValue: 'Failed' },
    { value: Result.Success, viewValue: 'Success' },
  ];
  selectChange(event: any) {
    this.resultChanged.emit(event.target.value);
  }
}
