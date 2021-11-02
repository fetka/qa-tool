/* It returns the NEXT pointer position that is pointed at an element,
 calculation is based on the DIRECTION ( represented by positive or negative integer, -1 or  1 ) 
and PREVIOUS position of the pointer and the LENGTH of the underlying array. */
export function nextPointer(
  length: number,
  previousPosition: number,
  direction: number
) {
  const SUM = previousPosition + direction;
  const NEXT_POSITION = SUM % length;
  if (SUM > length && NEXT_POSITION === 1) return 0;
  if (NEXT_POSITION < 0) return length - 1;
  return NEXT_POSITION;
}

// module.exports = nextPointer;
