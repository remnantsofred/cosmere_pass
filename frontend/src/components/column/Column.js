import React, { useState } from 'react';
import './Column.css'

// Column will be children of Columns
const Column = ({children}) => {

  
  return (
    <div className="column">
      {children}
    </div>
  );
}

export default Column;