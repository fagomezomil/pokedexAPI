

export const HeaderPoke = () => {
  return (
    <div className='bg-neutral-100 border-b-8 border-red-500 h-[170px] top-0 fixed w-full z-50'>
      <div className=' flex justify-around  max-w-7xl mx-auto'>
        <img
          src='./images/pokeball.png'
          className='h-[160px] mt-16 hidden md:block float-right'
          alt=''
        />
        <div>
          <img
            src='./images/logopoke.webp'
            className='w-fit min-h-[120px] max-h-[160px] md:max-h-[215px] mt-10 md:mt-3'
            alt=''
          />
        </div>
        <img src='./images/ash.png' className='h-[145px] mt-6 hidden md:block float-right' alt='' />
      </div>
    </div>
  );
};
