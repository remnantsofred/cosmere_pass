import React, { useState } from 'react';
import './Columns.css'

// Columns will take in multiple column components as children
const Columns = ({children, id='', className="columns"}) => {

  
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
}

export default Columns;