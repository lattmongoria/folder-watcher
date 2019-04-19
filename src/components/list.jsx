import ListItem from './listItem'
import React, { Component } from 'react';

class List extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.list.map( (fileEvent,index) => (
            <li key={index}>{fileEvent}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
