/* eslint-disable object-curly-newline */
import { ResultEnum, DigitalFormatTypeEnum } from '../models/enums';
import { Screenshot, TestCase } from '../models/test-case';

export const TEST_CASES: TestCase[] = [
  {
    title: 'title 1',
    id: 'T1',
    description: `<html><pre> description 1  description 1 \\n description 1  description 1  description 1 
    description 1  description 1  description 1  description 1  description 1 
    description 1  description 1  description 1  description 1  description 1 
    description 1  description 1  description 1  description 1  description 1 
    description 1  description 1  description 1  description 1  description 1 </pre></html> `,
    outcome: 'outcome 1',
    result: ResultEnum.Success,
    steps: ['step 1'],
    screenshots: [
      {
        title: '../../assets/screenshots/IMG_0098.PNG',
        link: '../../assets/screenshots/IMG_0098.PNG',
        type: DigitalFormatTypeEnum.IMAGE,
      },
    ],
  },
  {
    title: 'title 2',
    id: 'T2',
    description: ' description 2',
    outcome: 'outcome 2',
    result: ResultEnum.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 3 title 3 title 3 title 3 title 3 title 3 title 3 title 3',
    id: 'T3',
    description: ` description 3 description 3 description 3 description 3 description 3
       description 3 description <p>hello</p> 3 description 3 description 3 description 3 description 3 description 3
       description 3 description 3 description 3 description 3
        description 3 description 3 description 3 description 3 description 3`,
    outcome: 'outcome 3',
    result: ResultEnum.Failed,
    steps: [
      'step 1 step 1 step 1 step 1 step 1 step 1',
      'step 2step 1 step 1step 1 step 1step 1 step 1',
      'step 3',
    ],
    screenshots: [
      {
        title: '../../assets/screenshots/IMG_0094.PNG',
        link: '../../assets/screenshots/IMG_0094.PNG',
        type: DigitalFormatTypeEnum.IMAGE,
      },
      {
        title: '../../assets/screenshots/AUTT1857.MP4',
        link: '../../assets/screenshots/AUTT1857.MP4',
        type: DigitalFormatTypeEnum.VIDEO,
      },
    ],
  },
  {
    title: 'title 4',
    id: 'T4',
    description: ' description 4',
    outcome: 'outcome 4',
    result: ResultEnum.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 5',
    id: 'T5',
    outcome: 'outcome 5',
    description: ' description 5',
    result: ResultEnum.Pending,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 6',
    description: ' description 6',
    id: 'T6',
    outcome: 'outcome 6',
    result: ResultEnum.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
];

export const SCREENSHOT_LIST: Screenshot[] = [
  {
    title: '../../assets/screenshots/IMG_0094.PNG',
    link: '../../assets/screenshots/IMG_0094.PNG',
    type: DigitalFormatTypeEnum.IMAGE,
  },
  {
    title: '../../assets/screenshots/AUTT1857.MP4',
    link: '../../assets/screenshots/AUTT1857.MP4',
    type: DigitalFormatTypeEnum.VIDEO,
  },
  {
    title: '../../assets/screenshots/IMG_0098.PNG',
    link: '../../assets/screenshots/IMG_0098.PNG',
    type: DigitalFormatTypeEnum.IMAGE,
  },
  {
    title: '../../assets/screenshots/AUTT1857.MP4',
    link: '../../assets/screenshots/AUTT1857.MP4',
    type: DigitalFormatTypeEnum.VIDEO,
  },
  {
    title: '../../assets/screenshots/IMG_0096.PNG',
    link: '../../assets/screenshots/IMG_0096.PNG',
    type: DigitalFormatTypeEnum.IMAGE,
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
