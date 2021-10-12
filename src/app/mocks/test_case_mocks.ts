import { Result, TestCase } from '../models/test-case';

export const TEST_CASES: TestCase[] = [
  {
    title: 'title 1',
    id: 'T1',
    description: ' description 1',
    outcome: 'outcome 1',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
  },
  {
    title: 'title 2',
    id: 'T2',
    description: ' description 2',
    outcome: 'outcome 2',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
  },
  {
    title: 'title 3 title 3 title 3 title 3 title 3 title 3 title 3 title 3',
    id: 'T3',
    description: ` description 3 description 3 description 3 description 3 description 3
       description 3 description 3 description 3 description 3 description 3 description 3 description 3
       description 3 description 3 description 3 description 3
        description 3 description 3 description 3 description 3 description 3`,
    outcome: 'outcome 3',
    result: Result.Failed,
    steps: [
      'step 1 step 1 step 1 step 1 step 1 step 1',
      'step 2step 1 step 1step 1 step 1step 1 step 1',
      'step 3',
    ],
    imageLinks: ['../../assets/snapshots/IMG_0094.PNG'],
  },
  {
    title: 'title 4',
    id: 'T4',
    description: ' description 4',
    outcome: 'outcome 4',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
  },
  {
    title: 'title 5',
    id: 'T5',
    outcome: 'outcome 5',
    description: ' description 5',
    result: Result.Pending,
    steps: ['step 1', 'step 2', 'step 3'],
  },
  {
    title: 'title 6',
    description: ' description 6',
    id: 'T6',
    outcome: 'outcome 6',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
  },
];

export const SNAPSHOTS_LINKS = [
  '../../assets/snapshots/IMG_0094.PNG',
  '../../assets/snapshots/IMG_0095.PNG',
  '../../assets/snapshots/IMG_0093.PNG',
  '../../assets/snapshots/IMG_0096.PNG',
  '../../assets/snapshots/IMG_0098.PNG',
];
