import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  files!: File[];
  text: string = 'text replacement';
  constructor() {}

  ngOnInit(): void {}

  readFile(event: any, files: FileList | null) {
    console.log(event);
    if (files) {
      files
        .item(0)
        ?.text()
        .then((text) => (this.text = text));
    }
    // const reader = new FileReader();
    // const contentBlob = new Blob([reader.result], { type: 'text/plain' });
  }
}
