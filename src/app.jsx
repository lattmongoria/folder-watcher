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

  componentDidMount(){
    this.watchForFiles()
  }

  watchForFiles(){
    var chokidar = require('chokidar');

    var watcher = chokidar.watch(this.state.sessionAudioFilesFolder, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      alwaysStat: true
    });

    watcher
      .on('all', (typeOfEvent, path, stats)=>{
          var newEvent = {type:typeOfEvent ,path:path, stats:stats}

          if (newEvent.type === 'add'){
            console.log('add is firing')
            this.setState(state => {
              const list = this.state.list;
              list.push(newEvent)
              return {list}
          })
          }

          if (newEvent.type === 'unlink'){
            console.log('unlink is firing')
            this.setState(state => {
              const list = this.state.list;
              const indexToSplice = list.findIndex(existingItem => {
                return existingItem.path === newEvent.path;
              })
              console.log(indexToSplice)
              list.splice(indexToSplice, 1)
              return {list}
            })
          }
      })
  }


  render() {
    return (
      <div>
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
