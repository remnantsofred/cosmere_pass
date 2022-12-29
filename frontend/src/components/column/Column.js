import React, { useState } from 'react';
import './Column.css'

// Column will be children of Columns
const Column = ({children, id='', className="column"}) => {

  
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
}

export default Column;