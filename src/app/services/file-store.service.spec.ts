import { TestBed } from '@angular/core/testing';

import { ErrorType, TestCasesFileBox } from '../models/test-case';
import { FileStoreService } from './file-store.service';

/* eslint-disable operator-linebreak */
/* eslint-disable no-new */
/* eslint-disable prefer-arrow-callback */
describe('FileStoreService', () => {
  let storeService: FileStoreService;
  const fileObject: TestCasesFileBox = new TestCasesFileBox(
    'test-filename.json',
    'some text'
  );

  const key = 'testClearStorageFn';
  const jsonContent =
    '{"movie": {"title": "Jaws", "genre": ["thriller", "adventure" ], "date": "1975" }}';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storeService = TestBed.inject(FileStoreService);
    storeService.localStorageKeyToFileList = key;
    fileObject.isOpened = false;
  });
  afterEach(() => {
    storeService.uploadedFileList.length = 0;
    localStorage.removeItem(key);
  });

  describe('clearStorage', () => {
    it('should be a cleared storage', () => {
      storeService.localStorageKeyToFileList = key;
      localStorage.setItem(key, JSON.stringify({ item: 'test' }));
      storeService.clearStorage();
      const item = localStorage.getItem(key);
      expect(item).toEqual(null);
    });
  });

  describe('getFileList()', () => {
    it('should return the uploadedFileList', () => {
      storeService.storeJSON(fileObject);
      const list = storeService.getFileList();
      expect(list[0]).toEqual(fileObject);
    });
  });

  describe('downloadJson fn', () => {
    it('should throw error when content or filename are empty string', () => {
      const fn = storeService.downloadJson;
      const emptyString = '';
      const fileObj = new TestCasesFileBox(emptyString, emptyString);
      expect(() => {
        fn(fileObj);
      }).toThrow(new Error('content or filename empty'));
      expect(() => {
        fn(fileObj);
      }).toThrow(new Error('content or filename empty'));
    });

    it('should download a json file', () => {
      // create spy object with a click() method
      const spyObj = jasmine.createSpyObj('a', ['click']);
      // spy on document.createElement() and return the spy object
      spyOn(document, 'createElement').and.returnValue(spyObj);

      storeService.downloadJson(fileObject);

      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(spyObj.href).toBe(
        'data:application/json;charset=utf-8,some%20text'
      );
      expect(spyObj.target).toBe('_self');
      expect(spyObj.download).toBe('test-filename.json');
      expect(spyObj.click).toHaveBeenCalledTimes(1);
    });
  });

  describe('storeJSON fn', () => {
    it('should return error message when filename is used by another file', () => {
      storeService.storeJSON(fileObject);
      const errorObj = storeService.storeJSON(fileObject) as ErrorType;
      expect(errorObj.error).toEqual('The filename should be unique!');
    });

    it('should return an error object when file is opened', () => {
      fileObject.isOpened = true;
      const errorObj = storeService.storeJSON(fileObject) as ErrorType;
      expect(errorObj.error).toEqual('File should be closed');
    });

    it('should store file when filename is unique', () => {
      storeService.storeJSON(fileObject);
      const anotherFile = JSON.parse(JSON.stringify(fileObject));
      anotherFile.filename = 'new.json';
      storeService.storeJSON(anotherFile);
      storeService.storeJSON(fileObject);
      console.log(storeService.uploadedFileList);
      const newStoredObj: string | undefined =
        storeService.uploadedFileList[2]?.filename;
      expect(newStoredObj).toBeFalsy();
    });

    it('should be called the push fn on uploadedFileList ', () => {
      spyOn(storeService.uploadedFileList, 'push');
      storeService.storeJSON(fileObject);
      expect(storeService.uploadedFileList.push).toHaveBeenCalledOnceWith(
        fileObject
      );
    });

    it('should be called the setItem func on localStorage ', () => {
      spyOn(localStorage, 'setItem');
      storeService.localStorageKeyToFileList = key;
      storeService.storeJSON(fileObject);
      expect(localStorage.setItem).toHaveBeenCalledOnceWith(
        key,
        JSON.stringify(storeService.uploadedFileList)
      );
    });

    it('should return newLength', () => {
      storeService.uploadedFileList = [];
      storeService.storeJSON(fileObject);
      expect(storeService.uploadedFileList.length).toEqual(1);
    });

    it('should be "isOpened" set to false before store file', () => {
      const index = storeService.storeJSON(fileObject) as number;
      expect(storeService.uploadedFileList[index].isOpened).toBeFalse();
    });
  });

  describe('getFile()', () => {
    it('should return file', () => {
      storeService.uploadedFileList.push(fileObject);
      const file = storeService.getFile(fileObject.filename);
      expect(file).toEqual(fileObject);
    });

    it('should throw error when store is corrupted because more than one file was found', () => {
      storeService.uploadedFileList = [fileObject, fileObject];
      expect(() => {
        storeService.getFile(fileObject.filename);
      }).toThrowError('File was not found or store is corrupted.');
    });

    it('should throw error when store is corrupted because no file was found', () => {
      storeService.uploadedFileList = [];
      const result = storeService.getFile(fileObject.filename);
      expect(result).toEqual(null);
    });
  });

  describe('searchForFileWithTheSameFilename()', () => {
    it('should return false when no file was found with the given name', () => {
      const file2 = JSON.parse(JSON.stringify(fileObject));
      file2.filename = 'newFilename';
      storeService.uploadedFileList = [fileObject, file2];
      const searchResult =
        storeService.searchForFileWithTheSameFilename('any-name');

      expect(searchResult).toBeFalse();
    });

    it('should return true if filename was found in store', () => {
      const file2 = { ...fileObject };
      storeService.uploadedFileList = [fileObject];
      const searchResult = storeService.searchForFileWithTheSameFilename(
        file2.filename
      );

      expect(searchResult).toBeTrue();
    });
    it('should return false  if store is empty', () => {
      storeService.uploadedFileList = [];
      const searchResult = storeService.searchForFileWithTheSameFilename(
        fileObject.filename
      );

      expect(searchResult).toBeFalse();
    });
  });
  describe('removeFile()', () => {
    const fileB = JSON.parse(JSON.stringify(fileObject));
    const filename = 'remove.json';
    let removeResult!: boolean;
    beforeEach(() => {
      fileB.filename = filename;
      storeService.uploadedFileList.push(fileB);
      storeService.uploadedFileList.push(fileObject);
      removeResult = storeService.removeFile(filename);
    });
    describe('if remove is success', () => {
      it('should remove file from list', () => {
        const searchResult = storeService.uploadedFileList.find(
          (f) => f.filename === filename
        );
        expect(searchResult).toBe(undefined);
      });

      it('should return "true" if file\'s removed from list', () => {
        expect(removeResult).toBeTrue();
      });
    });

    describe('localStorage', () => {
      it('should be called with setItem() ', () => {
        spyOn(localStorage, 'setItem');
        storeService.uploadedFileList.push(fileB);
        storeService.removeFile(filename);
        expect(localStorage.setItem).toHaveBeenCalled();
      });
      it('should be updated ', () => {
        const stringifiedList = JSON.stringify(storeService.uploadedFileList);
        const localStorageValue = localStorage.getItem(key) as string;
        expect(stringifiedList).toEqual(localStorageValue);
      });
    });

    describe('if remove fails', () => {
      beforeEach(() => {
        // storeService.uploadedFileList.push(fileB);
      });
      it('should be returned "false" if file is not found in the list', () => {
        removeResult = storeService.removeFile('noname.json');
        expect(removeResult).toBeFalse();
      });
    });
  });
});
