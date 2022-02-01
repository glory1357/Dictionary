import React from 'react';
import { Link } from 'react-router-dom';

import img from './notFound.png';

function Page404({ clearStore }) {
  return (
    <div>
      <img src={img} style={{ display: 'block', margin: '0 auto' }} alt="not found" />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Page doesn&#39;t exist</p>
      <Link
        onClick={() => clearStore()}
        style={{
          display: 'block', textDecoration: 'underline', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px',
        }}
        to="/dictionary"
      >
        Back to main page
      </Link>
    </div>
  );
}

export default Page404;
