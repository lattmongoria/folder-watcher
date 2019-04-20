import TableRow from './tablerow'
import React, { Component } from 'react';

class Table extends Component {

  render() {
    return (
      <div>
        <table className="table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>File Size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map( (fileEvent,index) => (
              <TableRow key={index} fileEvent={fileEvent} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
