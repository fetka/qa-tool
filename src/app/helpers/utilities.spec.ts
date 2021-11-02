import { nextPointer } from './utilities';
// const nextPointer = require('./utilities.js');
describe('utilities', () => {
  describe('nextPointer', () => {
    it(`should return pointer [last_index - 1], 
  if previous was the last index of the array, and direction negative`, () => {
      const next = nextPointer(4, 3, -1);
      expect(next).toEqual(2);
    });
    it(`should return pointer [previous + 1], 
  if the previous was NOT the last index of the array, and direction positive`, () => {
      const next = nextPointer(4, 1, 1);
      expect(next).toEqual(2);
    });
    it(`should return pointer [the last index of the array], 
    if previous was the first index of the array, and direction negative`, () => {
      const next = nextPointer(4, 0, -1);
      expect(next).toEqual(3);
    });
    it(`should return pointer [0 + 1], 
  if the previous was the first index(0) of the array, and direction positive`, () => {
      const next = nextPointer(4, 0, 1);
      expect(next).toEqual(1);
    });
    it('should return pointer 0, if previous was the last index of the array, and direction positive', () => {
      const next = nextPointer(4, 3, 1);
      expect(next).toEqual(0);
    });
  });
});
