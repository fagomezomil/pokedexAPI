import React from 'react';

export const HeaderPoke = () => {
  return (
    <div className='bg-white border-b-8 border-red-500 h-[170px] top-0 fixed w-full z-50 flex justify-around'>
      <img
        src='./images/pokeball.png'
        className='h-[160px] ml-10 mt-16'
        alt=''
      />
      <img
        src='./images/logopoke.webp'
        className='h-[220px] ml-24 mt-3'
        alt=''
      />
      <img src='./images/ash.png' className='h-[145px] mt-6 mr-6' alt='' />
    </div>
  );
};
