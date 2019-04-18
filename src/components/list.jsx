import ListItem from './listItem'
import * as Promise from 'bluebird';
import React, { Component } from 'react';


class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [{event:'placeholder', path:'/placeholderpath'}],
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
      console.log(event);
      this.setState(state=>{
        const list = state.list.concat({event:path})
        return {list}
      })
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
