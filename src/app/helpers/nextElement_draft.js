/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
// const colors = require("colors"); // uncomment when run test
function getNextPointer(arrLength, oldPointer, direction) {
  const BAD_REQUEST = 400;
  let pointer = oldPointer;
  let arrayLength = arrLength;
  let pointerQueue = Array.from({ length: arrLength }, (x, i) => i);

  function initQueue() {
    if (arrayLength === 1) return;
    for (let i = 0; i <= pointer; i++) {
      const firstElement = pointerQueue.shift() || 0;
      pointerQueue.push(firstElement);
    }
  }

  function dequeue() {
    const firstElement = pointerQueue.shift() || 0;
    pointerQueue.push(firstElement);
    if (firstElement === pointer) {
      return dequeue();
    }
    return firstElement;
  }

  function enqueue() {
    const lastElement = pointerQueue.pop() || 0;
    pointerQueue.unshift(lastElement);
    if (lastElement === pointer) {
      return enqueue();
    }
    return lastElement;
  }

  initQueue();

  if (direction > 0) {
    return dequeue();
  }
  if (direction < 0) {
    // pointerQueue = pointerQueue.reverse();
    return enqueue();
  }

  return BAD_REQUEST;
}
const selfTest = () => {
  let countGood = 0;
  let badCount = 0;
  let testCount = 0;
  function evaluate(expected, received) {
    const result = expected === received;
    if (result) {
      ++countGood;
      ++testCount;
      return;
    }
    if (!result) {
      testCount++;
      ++badCount;
      console.log(
        testCount,
        `- expected: ${expected}, received: ${received}`.red
      );
    }
  }
  let p = getNextPointer(3, 1, -1);
  evaluate(0, p); // 1
  p = getNextPointer(3, p, -1);
  evaluate(2, p); // 2
  p = getNextPointer(3, p, -1);
  evaluate(1, p); // 3
  p = getNextPointer(3, p, -1);
  evaluate(0, p); // 4
  p = getNextPointer(3, p, -1);
  evaluate(2, p); // 5
  p = getNextPointer(3, p, 1);
  evaluate(0, p); // 6
  p = getNextPointer(3, p, -1);
  evaluate(2, p); // 7
  p = getNextPointer(3, p, 1);
  evaluate(0, p); // 8
  p = getNextPointer(3, p, 1);
  evaluate(1, p); // 9
  p = getNextPointer(3, p, 1);
  evaluate(2, p); // 10
  console.log(`${countGood} - good`.green);
  console.log(`${badCount} - bad`.red);
};

selfTest();
