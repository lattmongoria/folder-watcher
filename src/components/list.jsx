import ListItem from './listItem'
import React, { Component } from 'react';

class List extends Component {

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.props.list.map( (fileEvent,index) => (
            <ListItem key={index} fileEvent={fileEvent} />
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
