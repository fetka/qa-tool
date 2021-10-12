import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { TestCaseService } from './services/services';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { AllSnapshotComponent } from './all-snapshot/all-snapshot.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ImageDialogComponent, AllSnapshotComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [TestCaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
