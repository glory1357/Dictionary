import React from 'react';
import img from './error.gif';

function ErrorMessage() {
  return (
    <img
      style={{
        display: 'block', width: '400px', height: '400px', objectFit: 'contain', margin: '0 auto', marginTop: '25px',
      }}
      src={img}
      alt="Error"
    />
  );
}

export default ErrorMessage;
