/* eslint-disable object-curly-newline */
import { Screenshot, MediaType, Result, TestCase } from '../models/test-case';

export const TEST_CASES: TestCase[] = [
  {
    title: 'title 1',
    id: 'T1',
    description: ' description 1',
    outcome: 'outcome 1',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 2',
    id: 'T2',
    description: ' description 2',
    outcome: 'outcome 2',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
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
    screenshots: [
      {
        title: '../../assets/screenshots/IMG_0094.PNG',
        link: '../../assets/screenshots/IMG_0094.PNG',
        type: MediaType.IMAGE,
      },
      {
        title: '../../assets/screenshots/AUTT1857.MP4',
        link: '../../assets/screenshots/AUTT1857.MP4',
        type: MediaType.VIDEO,
      },
    ],
  },
  {
    title: 'title 4',
    id: 'T4',
    description: ' description 4',
    outcome: 'outcome 4',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 5',
    id: 'T5',
    outcome: 'outcome 5',
    description: ' description 5',
    result: Result.Pending,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 6',
    description: ' description 6',
    id: 'T6',
    outcome: 'outcome 6',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
];

export const SCREENSHOT_LIST: Screenshot[] = [
  {
    title: '../../assets/screenshots/IMG_0094.PNG',
    link: '../../assets/screenshots/IMG_0094.PNG',
    type: MediaType.IMAGE,
  },
  {
    title: '../../assets/screenshots/AUTT1857.MP4',
    link: '../../assets/screenshots/AUTT1857.MP4',
    type: MediaType.VIDEO,
  },
  {
    title: '../../assets/screenshots/IMG_0098.PNG',
    link: '../../assets/screenshots/IMG_0098.PNG',
    type: MediaType.IMAGE,
  },
  {
    title: '../../assets/screenshots/AUTT1857.MP4',
    link: '../../assets/screenshots/AUTT1857.MP4',
    type: MediaType.VIDEO,
  },
  {
    title: '../../assets/screenshots/IMG_0096.PNG',
    link: '../../assets/screenshots/IMG_0096.PNG',
    type: MediaType.IMAGE,
  },
];

export const SCREENSHOT_LINKS = [
  '../../assets/screenshots/IMG_0094.PNG',
  '../../assets/screenshots/IMG_0095.PNG',
  '../../assets/screenshots/IMG_0093.PNG',
  '../../assets/screenshots/IMG_0096.PNG',
  '../../assets/screenshots/IMG_0098.PNG',
  '../../assets/screenshots/IMG_0094.PNG',
  '../../assets/screenshots/IMG_0095.PNG',
  '../../assets/screenshots/IMG_0093.PNG',
  '../../assets/screenshots/IMG_0096.PNG',
  '../../assets/screenshots/IMG_0098.PNG',
  '../../assets/screenshots/AUTT1857.MP4',
  '../../assets/screenshots/AUTT1857.MP4',
];
