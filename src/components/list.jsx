import ListItem from './listItem'
import React, { Component } from 'react';

class List extends Component {

  render() {
    return (
      <div>
        <table className="table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Kind</th>
              <th>File Size</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map( (fileEvent,index) => (
              <ListItem key={index} fileEvent={fileEvent} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
