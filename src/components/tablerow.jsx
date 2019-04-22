import React from 'react';
const prettyBytes = require('pretty-bytes');
import getExtension from '../utils/GetExtension';

let TableRow = function statelessFunctionComponentClass(props) {
  return (
    <tr>
      <td>{props.listItem.path}</td>
      <td>{prettyBytes(props.listItem.stats.size)}</td>
      <td>{getExtension(props.listItem.path)}</td>
    </tr>
  );
};

export default TableRow;
