import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSelectComponent } from './material-select/material-select.component';
import { StandardSelectComponent } from './standard-select/standard-select.component';
import { EditableFieldComponent } from './editable-field/editable-field.component';

@NgModule({
  declarations: [
    StandardSelectComponent,
    MaterialSelectComponent,
    EditableFieldComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    StandardSelectComponent,
    MaterialSelectComponent,
    EditableFieldComponent,
  ],
})
export class SharedModule {}
