import React from 'react';
import Table from './components/table';
import fs from 'fs';

const {dialog} = require('electron').remote;



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sessionAudioFilesFolder: ''
    }
    this.selectSessionAudioFilesFolder = this.selectSessionAudioFilesFolder.bind(this);
  }

  componentDidMount(){

  }

  selectSessionAudioFilesFolder (){
    console.log('sessionAudioFilesFolder button pressed')
    console.log(this.state)
    var newSessionAudioFilesFolder = dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    this.setState({sessionAudioFilesFolder:newSessionAudioFilesFolder[0]})
    this.watchForFiles(newSessionAudioFilesFolder)
  }


  /*
  I don't like having all of this here. Could it be moved to a module?
  */
  watchForFiles(param){
    console.log(`param passed to watchForFiles ${param}`)

    var chokidar = require('chokidar');

    var watcher = chokidar.watch(param, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      alwaysStat: true
    });

    watcher
      .on('all', (typeOfEvent, path, stats)=>{

          var newEvent = {type:typeOfEvent, path:path, stats:stats}


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
        <h1 className="title">{this.sessionAudioFilesFolder}</h1>
        <div className="toolbar-actions">
          <div className="btn-group">
            <button className="btn btn-default" onClick={this.selectSessionAudioFilesFolder}>
              <span className="icon icon-folder"></span>
            </button>
          </div>


      </div>
      </header>
      <Table
        sessionAudioFilesFolder={this.sessionAudioFilesFolder}
        list={this.state.list}
      />
    </div>);
  }
}
