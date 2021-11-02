import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss'],
})
export class EditableFieldComponent {
  // text!: string;

  @Input()
  get text(): string {
    return this.text;
  }

  @Output() textChanged: EventEmitter<string> = new EventEmitter<string>();

  set text(val) {
    this.textChanged.emit(this.text);
  }
  // @Output('inputText') outputText: EventEmitter<string> =
  //   new EventEmitter<string>();
  // send(editedText: any) {
  //   console.log(editedText);
  //   // this.outputText.emit('any');
  // }
}
