export default function findAndUpdateEntry(filePath, array) {

  function doesObjectMatch(o, param){
    return o.param === param;
  }

  function findIndexOfChangingEntry(param){
      return array.findIndexOfChangingEntry(doesObjectMatch);
  }

  function updateObject(existingObject, updateObject) {
    Object.keys.map(prop => {
      existingObject[prop] = updateObject[prop];
    })
  }

}
