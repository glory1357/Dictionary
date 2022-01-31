import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import img from './notFound.png';
import { storeClear } from '../../actions/index';

function Page404() {
  const dispatch = useDispatch();
  return (
    <div>
      <img src={img} style={{ display: 'block', margin: '0 auto' }} alt="not found" />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Page doesn&#39;t exist</p>
      <Link
        onClick={() => dispatch(storeClear())}
        style={{
          display: 'block', textDecoration: 'underline', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '30px',
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
}

export default Page404;
