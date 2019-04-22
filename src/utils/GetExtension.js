export default function getExtension(filePath) {
  const pieces = filePath.split('.');
  return pieces[pieces.length - 1]
}
