import React, { useState } from 'react';
import './Row.css'
// panel can only have rows. can add rows as props
const Row = ({children, id="", className="row"}) => {

  
  return (
    <div className={className} id={id} >
     {children}
    </div>
  );
}

export default Row;