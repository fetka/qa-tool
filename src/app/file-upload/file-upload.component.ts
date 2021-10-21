/* eslint-disable no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  text: string = 'text replacement';
  constructor(private router: Router) {}
  file!: File | null;
  filename!: string | undefined;
  ngOnInit(): void {}

  readFile(fileList: FileList | null) {
    if (fileList) {
      this.file = fileList.item(0);
      this.filename = fileList.item(0)?.name;

      fileList
        .item(0)
        ?.text()
        .then((text) => (this.text = text));
    }
  }
  navigate() {
    const route = this.router.config.find((r) => r.path === 'preview-json');
    route ? (route.data = { name: this.text }) : null;
    this.router.navigateByUrl('/preview-json');
  }
}
