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
    this.setState(state => {
      return {list:[]}
    })
    var newSessionAudioFilesFolder = dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    this.setState({sessionAudioFilesFolder:newSessionAudioFilesFolder[0]})
    this.watchForFiles(newSessionAudioFilesFolder)
  }



  watchForFiles(param){

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
            this.setState(state => {
              const list = this.state.list;
              list.push(newEvent)
              return {list}
          })
          }

          if (newEvent.type === 'unlink'){
            this.setState(state => {
              const list = this.state.list;
              const indexToSplice = list.findIndex(existingItem => {
                return existingItem.path === newEvent.path;
              })
              list.splice(indexToSplice, 1)
              return {list}
            })
          }


      })
      .on('change', fileThatChanged => {

        var pathOfFileThatChanged = fileThatChanged;

        function doesObjectMatch(o, param){
          return o.param === param;
        }

        function findIndexOfChangingEntry(arr, param){
            return arr.findIndex(doesObjectMatch);
        }


        this.setState( (state) => {
          var newArray = state.list;
          const target = findIndexOfChangingEntry(newArray,pathOfFileThatChanged);
          fs.stat(pathOfFileThatChanged, (err, stats)=>{
            const returnedStats = stats;
            const newEntry = {type:'change', path:pathOfFileThatChanged, stats:returnedStats}
            newArray.splice(target, 1, newEntry);
            return {list:newArray}
          })
        })
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
