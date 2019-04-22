import React from 'react';
const prettyBytes = require('pretty-bytes');
import getExtension from '../utils/GetExtension';
import readableDate from '../utils/readableDate';
import justTheFilename from '../utils/justTheFilename';

let TableRow = function statelessFunctionComponentClass(props) {
  return (
    <tr>
      <td>{justTheFilename(props.listItem.path)}</td>
      <td>{prettyBytes(props.listItem.stats.size)}</td>
      <td>{getExtension(props.listItem.path)}</td>
      <td>{readableDate(props.listItem.stats.birthtime)}</td>
    </tr>
  );
};

export default TableRow;
