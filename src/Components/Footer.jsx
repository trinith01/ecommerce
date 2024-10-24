import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='px-[15%] bg-gradient-to-r from-slate-900 to-slate-700 pt-8 pb-2'>
        <div className='flex gap-20 w-ful justify-between'>
            <div className='items-center justify-start max-w-[25rem]'>
                <Link className="text-4xl font-bold no-underline hover:no-underline bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 bg-clip-text text-transparent hover:text-transparent" to="/">
                    C-Express
                </Link>
                <p className='bg-transparent text-white mt-4 text-sm'>At C-Express, we are committed to delivering high-quality products at unbeatable prices. Shop from a wide range of categories and enjoy fast, reliable shipping.</p>
            </div>
            <div className="items-center justify-start max-w-[20rem]">
                <h3 className='bg-transparent text-white'>Quick Links</h3>
                <div className='text-left text-sm flex flex-col mt-4'>
                    <Link to='/' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Home</Link>
                    <Link to='/' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Electronics</Link>
                    <Link to='/' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Toys</Link>
                    <Link to='/' className='bg-transparent text-white mt-2 no-underline hover:no-underline'>Fashion</Link>
                </div>
            </div>
            <div>
                <h3 className='bg-transparent text-white'>Contact Us</h3>
                <p className='text-left text-sm bg-transparent text-white mt-6'>Email: cexpress@gmail.com</p>
                <p className='text-left text-sm bg-transparent text-white'>Phone: 0700000000</p>
            </div>
        </div>
      <div className="text-center mt-8">
        <h3 className='bg-transparent text-white text-sm'>&copy; 2024, All Rights Reserved. C-Express 2024</h3>
      </div>
    </footer>
  );
}

export default Footer;