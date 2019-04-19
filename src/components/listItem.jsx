import React from 'react';


let ListItem = function statelessFunctionComponentClass(props) {
  return (
    <li className="list-group-item">{props.fileEvent}</li>
  );
};

export default ListItem;
