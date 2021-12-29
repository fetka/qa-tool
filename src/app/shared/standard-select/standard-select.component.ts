import { Result } from '../../models/test-case';
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
    { value: Result.Pending, viewValue: 'Pending' },
    { value: Result.Failed, viewValue: 'Failed' },
    { value: Result.Success, viewValue: 'Success' },
  ];

  selectChanged(event: Event | any) {
    this.resultChanged.emit(event.target.value);
    this.edited = true;
  }
}
