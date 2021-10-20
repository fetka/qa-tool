import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSelectComponent } from './material-select/material-select.component';
import { StandardSelectComponent } from './standard-select/standard-select.component';

@NgModule({
  declarations: [StandardSelectComponent, MaterialSelectComponent],
  imports: [CommonModule, MaterialModule],
  exports: [StandardSelectComponent, MaterialSelectComponent],
})
export class SharedModule {}
