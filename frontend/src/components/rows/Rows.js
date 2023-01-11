import React, { useState } from 'react';
import './Rows.css';
// Rows will take Row components as children
const Rows = ({children, id="", className="rows"}) => {
  return (
    <div className={className} id={id}>
     {children}
    </div>
  );
}

export default Rows;