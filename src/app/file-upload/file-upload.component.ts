/* eslint-disable no-loop-func */
import {
  FileType,
  ErrorType,
  DigitalFormatType,
  Result,
  Screenshot,
  TestCase,
  TestCasesFileBox,
} from '../models/test-case';
import { db } from '../db';
/* eslint-disable function-paren-newline */
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';

import * as utilities from '../helpers/utilities';
import { FileStoreService } from '../services/file-store.service';

// eslint-disable-next-line import/no-useless-path-segments

const jsonFormat = utilities.jsonFormatExp();
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  displayedFileContent!: string;
  filenameValue!: string;
  fileBoxList!: TestCasesFileBox[];
  recentFileBox!: TestCasesFileBox | null;
  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 20000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };
  testCasesFileBoxList$ = liveQuery(() => db.testCasesFileBoxList.toArray());
  imageList: TestCasesFileBox[] = [];

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private storage: FileStoreService,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.fetchFileList();
  }

  readImage(fileList: FileList | null) {
    let file!: File | null;
    if (fileList) {
      // console.log('load start');
      for (let index = 0; index < fileList.length; index++) {
        const reader = new FileReader();
        file = fileList.item(index);
        file ? reader.readAsDataURL(file as Blob) : null;
        console.log('load', file?.type);
        reader.onloadend = () => {
          const box = new TestCasesFileBox(
            file?.name as string,
            reader.result as string,
            file?.size as number,
            file?.type as FileType,
            file?.lastModified as number
          );
          this.imageList.push(box);
          console.log('loadend');
        };
      }
    }
    console.log('loadend', this.imageList);
  }
  async saveImage() {
    await db
      .open()
      .catch((err) =>
        console.error('Failed to open db: ' + (err.stack || err))
      );

    this.imageList.forEach(async (image) => {
      await db.testCasesFileBoxList.add({
        filename: image.filename,
        content: image.content,
        size: image.size,
        type: image.type,
        uploadedAt: image.uploadedAt,
        uploadedAtFormatted: image.uploadedAtFormatted,
      });
    });
    const box: TestCasesFileBox = (await db.testCasesFileBoxList.get(
      5
    )) as TestCasesFileBox;
    // this.imageUrl = screenshot.dataUrl as string;
    // await db.close();
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
        console.log(file?.type);
        this.recentFileBox = new TestCasesFileBox(
          filename,
          reader.result as string,
          file?.size as number,
          file?.type as FileType,
          file?.lastModified as number
        );
      });
    }
  }

  fetchFileList() {
    this.fileBoxList = this.storage.getFileList();
  }

  createTestSuite() {
    console.log(this.filenameValue);
    const newTestCase: TestCase = {
      id: '',
      title: 'title',
      description: 'description',
      outcome: 'outcome',
      result: Result.Pending,
      screenshots: [],
      steps: ['step 1', 'step 2', 'step 3'],
    };
    this.recentFileBox = new TestCasesFileBox(
      this.filenameValue,
      JSON.stringify([newTestCase]),
      0,
      'application/json',
      Date.now()
    );
    // this.fileBoxList.push(this.recentFileBox);
    // this.displayContent(this.fileBoxList.length - 1);
    this.filenameValue = '';
    this.save();
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
    this.recentFileBox = {
      ...this.fileBoxList[index],
    } as TestCasesFileBox;
    // console.log(jsonFormat(JSON.parse(copyBox.text)));
    this.displayedFileContent = jsonFormat(
      JSON.parse(this.recentFileBox.content)
    );
  }

  deleteFile(index: number) {
    this.storage.removeFile(this.fileBoxList[index].filename);
  }

  downloadFile(index: number) {
    // console.log(this.fileBoxList[index]);
    // this.fileBoxList[index].open();
    // if (this.fileBoxList[index].isOpened) return;
    try {
      const copyBox: TestCasesFileBox = {
        ...this.fileBoxList[index],
      } as TestCasesFileBox;
      const fileProps = {
        filename: copyBox.filename,
        text: jsonFormat(JSON.parse(copyBox.content)),
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
