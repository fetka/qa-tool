import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ImageComponent } from './image/image.component';
import { MaterialModule } from './material/material.module';
import { ScreenshotsComponent } from './screenshots/screenshots.component';
import { TestCaseService } from './services/services';
import { ShortTextPipe } from './short-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageDialogComponent,
    ScreenshotsComponent,
    ImageComponent,
    ShortTextPipe,
  ],
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
