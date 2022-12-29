import React, { useState } from 'react';
import './Row.css'
// panel can only have rows. can add rows as props
const Row = ({children}) => {

  
  return (
    <div className="row" >
     {children}
    </div>
  );
}

export default Row;