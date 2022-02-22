import Image from 'next/image';
import React from 'react';
import fork from '../../img/tenedor.svg';
export const Loading = () => {
  return (
    <div className='clock-container'>
      <div className='clock-grid'>
        <div className='clock'>
          <div className='hand hour'></div>
          <div className='hand minute'> </div>
        </div>
        <h2 className='loading-text'>Loading...</h2>
      </div>
    </div>
  );
};
