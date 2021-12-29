import Dexie, { Table } from 'dexie';

import { TestCasesFileBox } from './models/test-case';

// export interface Screenshot {
//   id?: number;
//   title: string;
//   blob: Blob | null;
// }

export class AppDB extends Dexie {
  testCasesFileBoxList!: Table<Partial<TestCasesFileBox>, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      testCasesFileBoxList: '++id',
    });
    // this.on('populate', () => this.populate());
  }

  //   async populate() {
  //     await db.screenshots.bulkAdd([
  //       {
  //         title: 'Feed the birds',
  //         link: '',
  //         type: MediaType.IMAGE,
  //       },
  //       {
  //         title: 'Watch a movie',
  //         link: '',
  //         type: MediaType.IMAGE,
  //       },
  //       {
  //         title: 'Have some sleep',
  //         link: '',
  //         type: MediaType.IMAGE,
  //       },
  //     ]);
  //   }
}

export const db = new AppDB();
