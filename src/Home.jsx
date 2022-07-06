import {
  explore,
  twitter,
  discord,
  medium,
  coinLeft,
  coinRight,
  color1,
  color2,
  coin,
  logo,
  twitterFooter,
  telegramFooter,
  mediumFooter,
} from "./img";

function Home() {
  return (
    <div className='relative overflow-hidden  max-h-fit bg-dark text-white  font-dmsans'>
      <img src={color1} alt='bg-color' className='absolute   top-0 left-0' />
      <img src={color2} alt='bg-color' className='absolute   top-0 right-0' />
      <img
        src={coinRight}
        alt='bg-color'
        className='absolute hidden md:block md:w-auto md:h-auto z-0  top-[10%] right-0'
      />
      <img
        src={coinLeft}
        alt='bg-color'
        className='absolute hidden md:block md:w-auto md:h-auto   top-[55%] z-0  left-0'
      />

      <nav className='padding pt-8 lg:pt-20 justify-between items-center flex'>
        <div className='logo z-50 flex'>
          <img src={logo} alt='bg-color' />
          <h2 className='font-monument font-bold hidden md:block text-2xl ml-3'>
            Cloudax
          </h2>
        </div>
        <button className='   btn'>Connect</button>
      </nav>

      <div className='hero'>
        <div className='flex btn-set-1 justify-between'>
          <button className=' glow text-black   text btn'>Upcoming</button>
          <button className='  text-black  text  btn'>BUSD</button>
        </div>

        <div className='ido  '>
          <img
            src={coin}
            className='z-50 w-16 h-16 lg:w-auto lg:h-32'
            alt='Coin'
          />
          <div className='z-50 ml-4'>
            <p className='header  font-bold  '>Cloudax Token IDO</p>
            <div className='socials'>
              <a href='https://' className='duration-200 hover:scale-150'>
                <img
                  src={explore}
                  className='w-6 h-6 lg:w-auto lg:h-auto'
                  alt='bg-color'
                />
              </a>
              <a href='https://' className='duration-200 hover:scale-150'>
                <img
                  src={twitter}
                  className='w-6 h-6 lg:w-auto lg:h-auto'
                  alt='bg-color'
                />
              </a>
              <a href='https://' className='duration-200 hover:scale-150'>
                <img
                  src={discord}
                  className='w-6 h-6 lg:w-auto lg:h-auto'
                  alt='bg-color'
                />
              </a>
              <a href='https://' className='duration-200 hover:scale-150'>
                <img
                  src={medium}
                  className='w-6 h-6 lg:w-auto lg:h-auto'
                  alt='bg-color'
                />
              </a>
            </div>
          </div>
        </div>

        <p className='text lg:text-center relative z-50 px-8 lg:px-0 margin'>
          Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sit sapien ultricies est sapien sed
          maecenas amet sem id. In hendrerit auctor urna pellentesque sed.
        </p>
        <div className='flex btn-set-2 margin2 justify-between'>
          <button className='  text-black  btn2'>Connect</button>
          <button className='  text-white   btn2-border'>How to Pay?</button>
        </div>
      </div>

      <section className='padding margin2  z-50'>
        <div className='lg:flex justify-between  '>
          <div className='glass w-auto lg:w-[49%] rounded-2xl p-6'>
            <p className='text'>Progress</p>
            <div className='w-full  relative h-[20px] rounded-full mt-4 bg-white'>
              <div className='w-[68%]  absolute -top-2 h-[20px] rounded-full mt-2 bg-myblue'></div>
            </div>

            <div className='flex mt-4 justify-between'>
              <p className='text'>68%</p>
              <p className='text'>23000.12/300000 BUSD</p>
            </div>
            <div className='xl:flex w-full    mt-10  '>
              <input
                className='md:w-[400px] xl:w-[400px] lg:w-[300px] ml-[10%] md:ml-[17%] lg:ml-0   xl:h-[30px] h-[15px] rounded-full text2  text-black py-4 lg:py-5 xl:py-6 px-4 lg:px-10 border-0 text2 outline-none bg-white'
                placeholder='Amount'
              />
              <button className=' ml-[30%] xl:relative -top-2 md:ml-[40%] mt-4 lg:ml-24 xl:ml-10  text-black  btn2'>
                Swap
              </button>
            </div>
          </div>
          <div className='glass xl:items-center w-auto lg:w-[49%] mt-6 lg:mt-0 rounded-2xl flex justify-between  p-6'>
            <div className='text'>
              <p className='mt-1'>Opens</p>
              <p className='mt-1'>Closes</p>
              <p className='mt-1'>Swap Rate</p>
              <p className='mt-1'>Access type</p>
            </div>
            <div className='text '>
              <p className='mt-1'>2021-10-23 08:00:00 UTC</p>
              <p className='mt-1'>2021-10-23 08:00:00 UTC</p>
              <p className='mt-1'>1 BUSD = 23324 CLDR</p>
              <p className='mt-1'>Private</p>
            </div>
          </div>
        </div>

        <div className='glass margin overflow-auto flex justify-between rounded-2xl p-12'>
          <table className=' z-50 text w-full'>
            <thead>
              <tr>
                <th className='py-3'>Allocation</th>
                <th className='py-3'>Percentage</th>
                <th className='py-3'>Date</th>
                <th className='py-3'>Claimed</th>
                <th className='py-3'>Action</th>
              </tr>
            </thead>
            <tbody className='text-center  '>
              <tr className=' xl:hover:scale-105 duration-300 my-border'>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>DEX Listing</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>
                  {" "}
                  <button className='  text-black   btn2'>Claim</button>
                </th>
              </tr>
              <tr className=' xl:hover:scale-105 duration-300 my-border'>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>21-11-12 15:00 UTC</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>
                  {" "}
                  <button className='  text-black   btn2'>Claim</button>
                </th>
              </tr>
              <tr className=' xl:hover:scale-105 duration-300 my-border'>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>21-11-12 15:00 UTC</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>
                  {" "}
                  <button className='  text-black   btn2'>Claim</button>
                </th>
              </tr>
              <tr className=' xl:hover:scale-105 duration-300 my-border'>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>21-11-12 15:00 UTC</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>
                  {" "}
                  <button className='  text-black   btn2'>Claim</button>
                </th>
              </tr>
              <tr className=' xl:hover:scale-105 duration-300 my-border'>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>21-11-12 15:00 UTC</th>
                <th className='py-6 px-6'>0000</th>
                <th className='py-6 px-6'>
                  {" "}
                  <button className='  text-black   btn2'>Claim</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className=' footer-bg relative z-50 mt-20 lg:mt-32 xl:mt-80 padding w-full flex items-center justify-between  h-[100px]'>
        <div className='flex justify-between'>
          <p className=' text-[8px] lg:text-base'>
            Cloudr (c) 2022. All Rights Reserved.
          </p>
        </div>
        <div className='flex w-[80px] lg:w-[150px] justify-between'>
          <a href='https://' className='duration-200 hover:scale-150'>
            <img className='h-4 w-4' src={twitterFooter} alt='Twitter' />
          </a>
          <a href='https://' className='duration-200 hover:scale-150'>
            <img className='h-4 w-4' src={telegramFooter} alt='Twitter' />
          </a>
          <a href='https://' className='duration-200 hover:scale-150'>
            <img className='h-4 w-4' src={mediumFooter} alt='Twitter' />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
