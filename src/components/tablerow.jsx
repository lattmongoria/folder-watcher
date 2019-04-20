import React from 'react';
const prettyBytes = require('pretty-bytes');

let TableRow = function statelessFunctionComponentClass(props) {
  return (
    <tr>
      <td>{props.fileEvent.path}</td>
      <td>{prettyBytes(props.fileEvent.stats.size)}</td>
      <td></td>
    </tr>
  );
};

export default TableRow;
