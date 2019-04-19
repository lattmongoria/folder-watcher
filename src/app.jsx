import React from 'react';
import List from './components/list';
import fs from 'fs';

const {dialog} = require('electron').remote;

var sessionAudioFilesFolder = dialog.showOpenDialog({
    properties: ['openDirectory']
});

export default class App extends React.Component {
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
    .on('ready', (event, path)=>{
      let filePath = this.state.sessionAudioFilesFolder[0]
      fs.readdir(filePath, (err, files) => {
        this.setState(state => {
          const list = files.slice(1);
          return {list}
        })
      })
    })
/*
    .on('add', (path, event) => {
        if (checkIfThePathIsInTheList(this.state.list, path) != true){
          this.setState(state=>{
            const list = state.list.concat({event:path}).sort(function(a,b){
              return b.event > a.event
            })
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
*/
  }

  render() {
    return (
      <div>
      {this.watchForFiles()}
      <h2>{sessionAudioFilesFolder}</h2>
      <List sessionAudioFilesFolder={sessionAudioFilesFolder}
            list={this.state.list}
      />
    </div>);
  }
}
