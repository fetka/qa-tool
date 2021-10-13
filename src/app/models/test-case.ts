/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  outcome: string;
  result: Result;
  imageLinks?: string[];
}
export enum Result {
  Pending = 0,
  Failed = 1,
  Success = 2,
}

export enum Direction {
  LEFT = -1,
  RIGHT = 1,
}
