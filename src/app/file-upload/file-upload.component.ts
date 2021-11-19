import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { TestCasesFileBox } from '../models/test-case';
import { FileStoreService } from '../services/file-store.service';
// eslint-disable-next-line import/no-useless-path-segments
import { ErrorType } from './../models/test-case';
import * as utilities from '../helpers/utilities';

const jsonFormat = utilities.jsonFormatExp();
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  displayedFileContent!: string;

  fileBoxList!: TestCasesFileBox[];
  recentFileBox!: TestCasesFileBox | null;
  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 20000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private storage: FileStoreService,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.fetchFileList();
  }

  readFile(fileList: FileList | null) {
    let file!: File | null;
    const reader = new FileReader();
    if (fileList) {
      file = fileList.item(0);
      const filename = fileList.item(0)?.name as string;
      // console.log(222, fileList.item(0)?.lastModified);
      file ? reader.readAsText(file as Blob) : null;
      reader.addEventListener('loadend', (event) => {
        this.displayedFileContent = reader.result as string;
        this.recentFileBox = new TestCasesFileBox(
          filename,
          this.displayedFileContent,
          fileList.item(0)?.lastModified
        );
      });
    }
  }

  fetchFileList() {
    this.fileBoxList = this.storage.getFileList();
  }

  save() {
    if (!this.recentFileBox) return;
    const index: number | ErrorType = this.storage.storeJSON(
      this.recentFileBox as TestCasesFileBox
    );
    if (typeof index === 'number') {
      this.recentFileBox = null;
      this.fetchFileList();
    } else {
      this._snackBar.open(index.error as string, 'Dismiss', {
        verticalPosition: 'top',
      });
    }
  }

  displayContent(index: number) {
    const fb: TestCasesFileBox = {
      ...this.fileBoxList[index],
    } as TestCasesFileBox;
    this.recentFileBox = new TestCasesFileBox(
      fb.filename,
      fb.text,
      fb.uploadedAt
    );
    // console.log(jsonFormat(JSON.parse(copyBox.text)));
    this.displayedFileContent = jsonFormat(JSON.parse(this.recentFileBox.text));
  }

  deleteFile(index: number) {
    this.storage.removeFile(this.fileBoxList[index].filename);
  }

  downloadFile(index: number) {
    // console.log(this.fileBoxList[index]);
    // this.fileBoxList[index].open();
    if (this.fileBoxList[index].isOpened) return;
    try {
      const copyBox: TestCasesFileBox = {
        ...this.fileBoxList[index],
      } as TestCasesFileBox;
      const fileProps = {
        filename: copyBox.filename,
        text: jsonFormat(JSON.parse(copyBox.text)),
      };

      console.log(fileProps);
      this.storage.downloadJson(fileProps);
    } catch (error: any) {
      const msg = (error as string) + ' !!';
      this._snackBar.open(msg, 'Dismiss', {
        duration: 4500,
        verticalPosition: 'top',

        // panelClass: ['example-pizza-party'],
      });
    }
  }

  clearStorage() {
    const ref: MatSnackBarRef<ConfirmSnackBarComponent> =
      this._snackBar.openFromComponent(ConfirmSnackBarComponent, {
        data: 'Please confirm Clear storage. ',
        ...this.configSuccess,
      });
    ref.instance.confirmed.subscribe((val) => {
      console.log(val);
      if (val === true) this.storage.clearStorage();
      this.fetchFileList();
      ref.dismiss();
      window.location.reload();
    });
  }

  confirmed(event: boolean) {
    console.log(107, event);
  }
  navigate() {
    const routeToPreview = this.router.config.find(
      (route) => route.path === 'preview-json'
    );
    routeToPreview
      ? (routeToPreview.data = { name: this.displayedFileContent })
      : null;
    this.router.navigateByUrl('/preview-json');
  }
}
@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
    <span class="example-pizza-party"> {{ data }} 🍕 </span>
    <button
      style="margin-left: 10px; float: right;"
      mat-raised-button
      color="accent"
      (click)="confirmed.emit(true)"
    >
      Clear
    </button>
    <button
      style="margin-left: 10px; float: right;"
      mat-raised-button
      (click)="confirmed.emit(false)"
    >
      Cancel
    </button>
  `,
})
export class ConfirmSnackBarComponent {
  @Output('confirmed') confirmed = new EventEmitter<boolean>();

  constructor(
    public snackBarRef: MatSnackBarRef<ConfirmSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
