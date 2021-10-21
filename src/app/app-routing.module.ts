import { PreviewJsonComponent } from './preview-json/preview-json.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ScreenshotsComponent } from './screenshots/screenshots.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'screenshots', component: ScreenshotsComponent },
  { path: 'file-upload', component: FileUploadComponent },
  {
    path: 'preview-json',
    component: PreviewJsonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
