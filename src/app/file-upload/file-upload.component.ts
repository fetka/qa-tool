/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import { FileService } from '../services/file.service';
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonFileObject } from '../models/test-case';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  fileContent: string = 'file content placeholder';
  url!: string;
  file!: File | null;
  filename: string = '...';
  reader = new FileReader();
  blob!: Blob;
  fileList!: JsonFileObject[];

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private fileService: FileService
  ) {}
  ngOnInit(): void {
    this.fetchFileList();
  }

  readFile(fileList: FileList | null) {
    if (fileList) {
      this.file = fileList.item(0);
      this.filename = fileList.item(0)?.name as string;

      this.file ? this.reader.readAsText(this.file) : null;
      this.reader.addEventListener('loadend', (event) => {
        this.fileContent = this.reader.result as string;

        // this.fileService.addUploadedJSON({
        //   filename: this.filename as string,
        //   text: this.fileContent as string,
        //   type: 'json',
        // });
        // this.fetchFileList();
        // fileList = null;
        // console.log(fileList === null);
      });
    }
  }

  fetchFileList() {
    try {
      this.fileList = this.fileService.getFileList();
    } catch (error) {
      null;
    }
  }

  save() {
    this.fileService.addUploadedJSON({
      filename: this.filename as string,
      text: this.fileContent as string,
      type: 'json',
    });
    this.fetchFileList();
  }

  downloadFile(obj: JsonFileObject) {
    try {
      this.fileService.downloadFile(obj);
    } catch (error: any) {
      const msg = (error as string) + ' !!';
      this._snackBar.open(msg, 'Dismiss', {
        duration: 4500,
        verticalPosition: 'top',

        // panelClass: ['example-pizza-party'],
      });
    }
  }

  navigate() {
    const routeToPreview = this.router.config.find(
      (route) => route.path === 'preview-json'
    );
    routeToPreview
      ? (routeToPreview.data = {
          name: this.fileContent,
        })
      : null;
    this.router.navigateByUrl('/preview-json');
  }
}
