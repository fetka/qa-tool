/* eslint-disable import/no-useless-path-segments */
/* eslint-disable max-classes-per-file */
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
import { ErrorType } from './../models/test-case';

/* eslint-disable no-multi-assign */
/* eslint-disable max-classes-per-file */
/* eslint-disable max-classes-per-file */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  displayedFileContent!: string;
  reader = new FileReader();
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
  ) {}

  ngOnInit(): void {
    this.fetchFileList();
  }

  readFile(fileList: FileList | null) {
    let file!: File | null;
    if (fileList) {
      file = fileList.item(0);
      const filename = fileList.item(0)?.name as string;
      console.log(fileList.item(0)?.lastModified);
      file ? this.reader.readAsText(file) : null;
      this.reader.addEventListener('loadend', (event) => {
        const fileContent = (this.displayedFileContent = this.reader
          .result as string);
        this.recentFileBox = new TestCasesFileBox(
          filename,
          fileContent,
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
    // if (!this.fileContent || !this.filename) return;
    // const fileToStore = new TestCasesFileBox(
    //   this.filename as string,
    //   this.fileContent as string
    // );
    const index: number | ErrorType = this.storage.storeJSON(
      this.recentFileBox as TestCasesFileBox
    );
    if (typeof index === 'number') {
      // this.fileContent = this.filename = undefined;
      // this.fileList = [];
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
      fb._text,
      fb.uploadedAt
    );

    this.displayedFileContent = this.recentFileBox.text;
  }

  deleteFile(index: number) {
    this.storage.removeFile(this.fileBoxList[index].filename);
  }

  downloadFile(index: number) {
    this.fileBoxList[index].open();
    if (this.fileBoxList[index].isOpened) return;
    try {
      const copyBox: TestCasesFileBox = {
        ...this.fileBoxList[index],
      } as TestCasesFileBox;
      const fileProps = { filename: copyBox.filename, text: copyBox._text };

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
    const ref: MatSnackBarRef<PizzaPartyComponent> =
      this._snackBar.openFromComponent(PizzaPartyComponent, {
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
      ? (routeToPreview.data = {
          name: this.displayedFileContent,
        })
      : null;
    this.router.navigateByUrl('/preview-json');
  }
}
@Component({
  selector: 'snack-bar-component-example-snack',
  // templateUrl: 'snack-bar-component-example-snack.html',
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
  // outputs: ['confirmed: confirmed($event)'],
})
export class PizzaPartyComponent {
  @Output('confirmed') confirmed = new EventEmitter<boolean>();

  constructor(
    public snackBarRef: MatSnackBarRef<PizzaPartyComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
