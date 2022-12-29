import React, { useState } from 'react';
import './Rows.css';
// Rows will take Row components as children
const Rows = ({children}) => {
  return (
    <div className="rows">
     {children}
    </div>
  );
}

export default Rows;