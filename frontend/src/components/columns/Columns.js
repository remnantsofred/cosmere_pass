import React, { useState } from 'react';
import './Columns.css'

// Columns will take in multiple column components as children
const Columns = ({children}) => {

  
  return (
    <div className="columns">
      {children}
    </div>
  );
}

export default Columns;