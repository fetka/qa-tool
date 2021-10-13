/* eslint-disable prefer-const */
/* eslint-disable quotes */
/* eslint-disable no-plusplus */
// const colors = require("colors");
function getNextPointer(arrLength, oldPointer, direction) {
  const BAD_REQUEST = 400;
  let pointer = oldPointer;
  let arrayLength = arrLength;
  let pointerQueue = Array.from({ length: arrLength }, (x, i) => i);

  function initQueue() {
    if (arrayLength === 1) return;
    //   const LEN = LEN;
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
    return enqueue();
  }
  return BAD_REQUEST;
}
const selfTest = () => {
  let count = 0;
  function evaluate(expected, received) {
    ++count;
    const result = expected === received;
    if (result) {
      console.log(count, `- all good`.green);
      return;
    }
    console.log(count, `- expected: ${expected}, received: ${received}`.red);
  }
  let p = getNextPointer(3, 1, -1);
  evaluate(0, p);
  p = getNextPointer(3, p, -1);
  evaluate(2, p);
  p = getNextPointer(3, p, -1);
  evaluate(1, p);
  p = getNextPointer(3, p, -1);
  evaluate(0, p);
  p = getNextPointer(3, p, -1);
  evaluate(2, p);
  p = getNextPointer(3, p, 1);
  evaluate(0, p);
  p = getNextPointer(3, p, -1);
  evaluate(2, p);
  p = getNextPointer(3, p, 1);
  evaluate(0, p);
  p = getNextPointer(3, p, 1);
  evaluate(1, p);
  p = getNextPointer(3, p, 1);
  evaluate(2, p);
};
// selfTest();
