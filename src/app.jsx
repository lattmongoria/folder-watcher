import React from 'react';
import List from './components/list';

const {dialog} = require('electron').remote;

var sessionAudioFilesFolder = dialog.showOpenDialog({
    properties: ['openDirectory']
});

export default class App extends React.Component {
  render() {
    return (<div>
      <h2>{sessionAudioFilesFolder}</h2>
      <List sessionAudioFilesFolder={sessionAudioFilesFolder}/>
    </div>);
  }
}
