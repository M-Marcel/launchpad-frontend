import {
  twitterFooter,
  telegramFooter,
  mediumFooter,
} from "../img/index";


export default function Footer(){
    return(
         <div>
            <footer className=' footer-bg relative z-50 mt-20 lg:mt-32 xl:mt-80 padding w-full flex items-center justify-between  h-[100px]'>
        <div className='flex justify-between'>
          <p className=' text-[8px] lg:text-base'>
            Cloudax (c) 2022. All Rights Reserved.
          </p>
        </div>
        <div className='flex w-[80px] lg:w-[150px] justify-between'>
          <a href='https://twitter.com/cloudaxHQ' className='duration-200 hover:scale-150'>
            <img className='h-4 w-4' src={twitterFooter} alt='Twitter' />
          </a>
          <a href='https://t.me/cloudaxOfficial' className='duration-200 hover:scale-150'>
            <img className='h-4 w-4' src={telegramFooter} alt='Twitter' />
          </a>
          <a href='http://cloudax.medium.com/' className='duration-200 hover:scale-150'>
            <img className='h-4 w-4' src={mediumFooter} alt='Twitter' />
          </a>
        </div>
      </footer>
         </div>
    )
}