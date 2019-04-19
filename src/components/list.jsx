import ListItem from './listItem'
import React, { Component } from 'react';

/*here's where I started getting crazy*/
class List extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.list.map( (fileEvent,index) => (
            <li key={index}>{fileEvent.event}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
