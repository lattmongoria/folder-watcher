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
  }

  render() {
    return (
      <div>
      {this.watchForFiles()}
      <header className="toolbar toolbar-header">
        <h1 className="title">{sessionAudioFilesFolder}</h1>
      </header>
      <List sessionAudioFilesFolder={sessionAudioFilesFolder}
            list={this.state.list}
      />
    </div>);
  }
}
