import ListItem from './listItem'
import React, { Component } from 'react';

const {dialog} = require('electron').remote;

var sessionAudioFilesFolder = dialog.showOpenDialog({
    properties: ['openDirectory']
});

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sessionAudioFilesFolder: sessionAudioFilesFolder
    }
  }

  watchForFiles(){
    var chokidar = require('chokidar');

    var watcher = chokidar.watch(this.state.sessionAudioFilesFolder, {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
    function checkIfThePathIsInTheList(arr, path) {
      return  arr.some(function(arrVal){
        return arrVal.event === path
      })
    }
    watcher
    .on('add', (path, event) => {
        if (checkIfThePathIsInTheList(this.state.list, path) != true){
          this.setState(state=>{
            const list = state.list.concat({event:path})
            return {list}
          })
        }
    })
    .on('unlink', (deletedFile) => {
      var updatedArray = [...this.state.list];

      function theLocationOfTheDeletedFile(fileInList) {
        return fileInList.event === deletedFile;
      }

      var indexOfOutgoingFile = this.state.list.findIndex(theLocationOfTheDeletedFile)

      updatedArray.splice(indexOfOutgoingFile, 1);
      this.setState({list: updatedArray});

    })
  }



  render() {
    return (
      <div>
        <ul>
          {this.watchForFiles()}

          {this.state.list.map( (fileEvent,index) => (
            <li key={index}>{fileEvent.event}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
