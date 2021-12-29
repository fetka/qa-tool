import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ConfirmSnackBarComponent,
  FileUploadComponent,
} from './file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MaterialModule } from './material/material.module';
import { PreviewJsonComponent } from './preview-json/preview-json.component';
import { ScreenshotsComponent } from './screenshots/screenshots.component';
import { FileStoreService } from './services/file-store.service';
import { LoggingService } from './services/logging.service';
import { TestCaseService } from './services/test-case.service';
import { ImageComponent } from './shared/image/image.component';
import { SharedModule } from './shared/shared.module';
import { ShortTextPipe } from './short-text.pipe';

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
    ConfirmSnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    TestCaseService,
    FileStoreService,
    LoggingService,
    {
      provide: MatSnackBarRef,
      useValue: {},
    },
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {}, // Add any data you wish to test if it is passed/used correctly
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
