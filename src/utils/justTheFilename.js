export default function justTheFilename(filePath) {
  const pieces = filePath.split('/');
  return pieces[pieces.length - 1]
}
