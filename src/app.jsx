import React from 'react';
import Table from './components/table';
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

    watcher
    .on('all', (event, path)=>{
      let filePath = this.state.sessionAudioFilesFolder[0]
        this.setState(state => {
          const list = watcher.getWatched()[sessionAudioFilesFolder];
          return {list}
        })
    })
  }

  render() {
    return (
      <div>
      {this.watchForFiles()}
      <header className="toolbar toolbar-header">
        <h1 className="title">{sessionAudioFilesFolder}</h1>
        <div className="toolbar-actions">
          <div className="btn-group">
            <button className="btn btn-default">
              <span className="icon icon-folder"></span>
            </button>
          </div>


      </div>
      </header>
      <Table
        sessionAudioFilesFolder={sessionAudioFilesFolder}
        list={this.state.list}
      />
    </div>);
  }
}
