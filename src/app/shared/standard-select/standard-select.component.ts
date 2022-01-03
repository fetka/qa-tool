import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { ResultEnum } from 'src/app/models/enums';

@Component({
  selector: 'standard-select',
  templateUrl: './standard-select.component.html',
  styleUrls: ['./standard-select.component.scss'],
})
export class StandardSelectComponent {
  @Input('result') result!: number;
  @Input('disabled') disabled!: boolean;
  @Output('resultChanged') resultChanged: EventEmitter<string> =
    new EventEmitter();
  @HostBinding('class.edited') edited: boolean = false;

  resultOptions: any[] = [
    { value: ResultEnum.Pending, viewValue: 'Pending' },
    { value: ResultEnum.Failed, viewValue: 'Failed' },
    { value: ResultEnum.Success, viewValue: 'Success' },
  ];

  selectChanged(event: Event | any) {
    this.resultChanged.emit(event.target.value);
    this.edited = true;
  }
}
