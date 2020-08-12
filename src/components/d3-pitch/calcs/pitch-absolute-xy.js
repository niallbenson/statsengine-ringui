export default function getPitchAbsoluteXY(x, y, width, height) {
  const absoluteX = width * x * 0.91312 + (width * 0.04348);
  const absoluteY = height * y * 0.94442 + (height * 0.02778);

  return [absoluteX, absoluteY];
}
