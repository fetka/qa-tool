/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from '../home/home.component';
import { ErrorType, TestCasesFileBox } from '../models/test-case';
import { PreviewJsonComponent } from '../preview-json/preview-json.component';
import { FileStoreService } from '../services/file-store.service';
import { FileUploadComponent } from './file-upload.component';

/* eslint-disable arrow-body-style */
describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  const fileBox: TestCasesFileBox = new TestCasesFileBox(
    'filename',
    'some test text'
  );
  let fileStoreServiceStub: Partial<FileStoreService>;
  fileStoreServiceStub = {
    uploadedFileList: [new TestCasesFileBox('filename', 'some test text')],
    localStorageKeyToFileList: 'test_test',
    getFileList: () => [],
    clearStorage: (): void => {},

    getFile: (): TestCasesFileBox | null => fileBox,
    downloadJson: (): void => {},
    storeJSON: (): number | ErrorType => 0,
    searchForFileWithTheSameFilename: (): boolean => true,
    removeFile: (): boolean => true,
  };
  const blob = new Blob(
    [
      `{
    "movie": {
        "title": "Jaws",
        "genre": [
            "thriller",
            "adventure"
        ],
        "date": "1975"
    }
}`,
    ],
    { type: 'application/json' }
  );
  // blob['lastModified'] = '';
  const file = <File>blob;
  // file.name = 'filename';

  // const file: File = {
  //   lastModified: 1111,
  //   name: 'filename',

  //   size: 500,
  //   type: 'json',
  //   arrayBuffer: function (): Promise<ArrayBuffer> {
  //     return new Promise<any>(() => {});
  //   },
  //   slice: function (start?: number, end?: number, contentType?: string): Blob {
  //     return blob;
  //   },
  //   stream: function (): ReadableStream<any> {
  //     return new ReadableStream<any>();
  //   },
  //   text: function (): Promise<string> {
  //     return new Promise<string>(() => 'text');
  //   },
  //   // webkitRelativePath: url.toString(),
  // };
  const fileList = {
    0: file,
    1: file,
    length: 2,
    item: (index: number) => file,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [
        OverlayModule,
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
          { path: 'preview-json', component: PreviewJsonComponent },
        ]),
      ],
      providers: [
        { provide: FileStoreService, useValue: fileStoreServiceStub },
        MatSnackBar,
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {}, // Add any data you wish to test if it is passed/used correctly
        },
      ],
    }).compileComponents();
    fileStoreServiceStub = TestBed.inject(FileStoreService);
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should be called fetchFileList() on init', () => {
  //   const spy = spyOn(component, 'fetchFileList');
  //   component.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // });
  xdescribe('readFile()', () => {
    it('should set recentFileBox', () => {
      component.readFile(fileList);
      expect(component.recentFileBox).toBeDefined();
    });
  });
});
