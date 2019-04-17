import React from 'react';
import ListItem from './listItem'
import data from '../data.json';

var chokidar = require('chokidar');
var sessionAudioFilesFolder = '/Users/reina-longoria/Desktop/test-directory'
var fileEventData = {files:[]};

chokidar.watch(sessionAudioFilesFolder, {ignored: /(^|[\/\\])\../})
  .on('all', (event, path) => {
    // console.log(event, path);
    fileEventData.files.push(path)
    console.log(fileEventData)
});

let List = React.createClass({
  createListItem: function (listItem) {
    console.log(`create list item was called with ${listItem}`)
    return <ListItem source={listItem} key={listItem} />;
  },

  createListItems: function (listItems) {
    return listItems.map(this.createListItem);
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">

            {this.createListItems(fileEventData.files)}

          </div>
        </div>
      </div>
    );
  }
});

export default List;
