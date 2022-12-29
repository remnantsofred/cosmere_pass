import React, { useState } from 'react';
import './Panel.css';

// panel can take in props like lightmode, darkmode, class mode
// prop = margins



// Panel components will fill Panels as children
const Panel = ({children, className='panel', id=''}) => {

  return (
    <div className={className} id={id}>
     {children}
    </div>
  );
}

export default Panel;