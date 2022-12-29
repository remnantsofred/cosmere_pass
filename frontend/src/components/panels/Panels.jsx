import React, { useState } from 'react';
import './Panels.css';

// panel can take in props like lightmode, darkmode, class mode
// prop = margins



// Panels will take in Panel components as children
const Panels = ({children, id="", className="panels"}) => {

  
  return (
    <div className={className} id={id}>
     {children}
    </div>
  );
}

export default Panels;