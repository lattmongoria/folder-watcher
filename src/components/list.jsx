import ListItem from './listItem'
import * as Promise from 'bluebird';
import React, { Component } from 'react';


class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sessionAudioFilesFolder: '/Users/reina-longoria/Desktop/test-directory'
    }
  }

  watchForFiles(){
    var chokidar = require('chokidar');

    var watcher = chokidar.watch(this.state.sessionAudioFilesFolder, {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
    watcher.on('add', (path, event) => {


      function checkIfThePathIsInTheList(arr, path) {
        return  arr.some(function(arrVal){
          return arrVal.path === path
        })
      }

        console.log(`true of false: ${checkIfThePathIsInTheList(this.state.list, path)}`)
        console.log(path)
        console.log(this.state.list)
        if (checkIfThePathIsInTheList(this.state.list, path)){
          this.setState(state=>{
            const list = state.list.concat({event:path})
            return {list}
          })
        }
    });
  }



  render() {
    return (
      <div>
        <ul>
          // {this.watchForFiles()}
          {this.state.list.map( (fileEvent,index) => (
            <li key={index}>{fileEvent.event} - {fileEvent.path}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
