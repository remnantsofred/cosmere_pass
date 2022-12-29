import React, { useState } from 'react';
import './Button.css';

const Button = ({buttonText, className="button", id=""}) => {

  return (
    <button className={className} id={id}>
      {buttonText}
    </button>
  )

}

export default Button