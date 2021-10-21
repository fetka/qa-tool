import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MaterialModule } from './material/material.module';
import { ScreenshotsComponent } from './screenshots/screenshots.component';
import { TestCaseService } from './services/services';
import { ImageComponent } from './shared/image/image.component';
import { SharedModule } from './shared/shared.module';
import { ShortTextPipe } from './short-text.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PreviewJsonComponent } from './preview-json/preview-json.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageDialogComponent,
    ScreenshotsComponent,
    ImageComponent,
    ShortTextPipe,
    FileUploadComponent,
    PreviewJsonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [TestCaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
