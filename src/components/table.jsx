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
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map( (listItem,index) => (
              <TableRow key={index} listItem={listItem} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
