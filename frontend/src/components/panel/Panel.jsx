import React, { useState } from 'react';
import './Panel.css';

// panel can take in props like lightmode, darkmode, class mode
// prop = margins



// Panel components will fill Panels as children
const Panel = ({children}) => {

  return (
    <div className="panel">
     {children}
    </div>
  );
}

export default Panel;