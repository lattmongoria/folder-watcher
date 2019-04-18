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
    watcher
    .on('add', (path, event) => {
      function checkIfThePathIsInTheList(arr, path) {
        return  arr.some(function(arrVal){
          return arrVal.event === path
        })
      }

        if (checkIfThePathIsInTheList(this.state.list, path) != true){
          this.setState(state=>{
            const list = state.list.concat({event:path})
            return {list}
          })
        }
    })
    .on('unlink', (params) => {
      console.log(params)
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
